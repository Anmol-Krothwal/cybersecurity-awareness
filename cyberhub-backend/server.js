// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const parentRoutes = require("./routes/parentRoutes");
const tipsRoutes = require("./routes/tipsRoutes"); // tips router (factory)
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ---------------- App basics ---------------- */
app.disable("x-powered-by");
app.set("trust proxy", 1); // needed for correct IPs & rate limiters behind proxies

/* ---------------- Security & performance ---------------- */
app.use(
  helmet({
    // Koyeb/iframed content (Google Maps) + typical CDN usage
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "frame-src": [
          "'self'",
          "https://www.google.com",
          "https://www.google.co.uk",
          "https://maps.google.com"
        ],
        "child-src": [
          "'self'",
          "https://www.google.com",
          "https://www.google.co.uk",
          "https://maps.google.com"
        ],
        "img-src": [
          "'self'",
          "data:",
          "https:",
          "https://*.google.com",
          "https://*.gstatic.com",
          "https://*.googleapis.com"
        ],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://www.google.com",
          "https://maps.googleapis.com"
        ],
        "style-src": ["'self'", "'unsafe-inline'", "https:", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https:", "data:"],
        "connect-src": [
          "'self'",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com"
        ]
      }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // Some hosts + iframes break if these are enabled; disable to be safe
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
  })
);

app.use(compression());

app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",").map(s => s.trim())
      : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- Rate limits ---------------- */
app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true }));
app.use("/api/parent/verify", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true }));

// Per-route rate limits for /api/tips
const tipsReadLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: true });
const tipsWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true });

/* ---------------- Health checks & ping ---------------- */
app.get("/", (_req, res) => res.status(200).send("OK"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/live", (_req, res) => res.send("live"));
app.get("/api/ready", (_req, res) => {
  const ready = mongoose.connection.readyState === 1; // 1 = connected
  res.status(ready ? 200 : 503).json({ dbConnected: ready });
});

/* ---------------- API routes (before static & SPA fallback) ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/tips", tipsRoutes({ tipsReadLimiter, tipsWriteLimiter }));

// Contact route MUST be before Not Found handler
app.use(
  "/api/contact",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true }),
  contactRoutes
);
console.log("➡️  /api/contact route mounted");

/* ---------------- Serve frontend static files (if present) ---------------- */
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath, { fallthrough: true }));

/* ---------------- SPA fallback (exclude /api/*) ---------------- */
// Express 5 safe regex — matches anything not starting with /api/
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) res.status(404).send("Not Found");
  });
});

/* ---------------- 404 for API only ---------------- */
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Not found" });
  }
  next();
});

/* ---------------- Error handler ---------------- */
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

/* ---------------- Start DB + server ---------------- */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Set it in your environment.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI) // Mongoose v6+ handles modern options by default
  .then(() => {
    console.log("✅ MongoDB connected");
    const server = app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

    // Graceful shutdown for containers (Koyeb sends SIGTERM)
    const shutdown = (signal) => () => {
      console.log(`\n${signal} received. Closing server...`);
      server.close(() => {
        console.log("HTTP server closed.");
        mongoose.connection.close(false).then(() => {
          console.log("Mongo connection closed.");
          process.exit(0);
        });
      });
      // Force-exit if not closed in time
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on("SIGTERM", shutdown("SIGTERM"));
    process.on("SIGINT", shutdown("SIGINT"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
