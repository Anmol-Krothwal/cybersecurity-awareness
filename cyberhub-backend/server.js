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
const tipsRoutes = require("./routes/tipsRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ---------------- App basics ---------------- */
app.disable("x-powered-by");
app.set("trust proxy", 1);

/* ---------------- Security & performance ---------------- */
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);
app.use(compression());

app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",").map((s) => s.trim())
      : true, // same-origin friendly; avoid "*" with credentials
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- Rate limits ---------------- */
app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 }));
app.use("/api/parent/verify", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }));

const tipsReadLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60 });
const tipsWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });

/* ---------------- API routes ---------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/live", (_req, res) => res.send("live"));
app.get("/api/ready", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ dbConnected: ready });
});

app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/tips", tipsRoutes({ tipsReadLimiter, tipsWriteLimiter }));
app.use("/api/contact", contactRoutes);
console.log("➡️  /api/contact route mounted");

/* ---------------- Serve frontend (SPA) ---------------- */
/**
 * IMPORTANT:
 * We serve from cyberhub-backend/dist (same folder as this file).
 * Make sure your frontend build has been copied into this folder:
 *   npm run build (frontend) -> copy ./dist/* -> ./cyberhub-backend/dist/
 */
const distPath = path.join(__dirname, "dist"); // <-- correct for backend/dist
app.use(express.static(distPath, { index: false }));

// SPA fallback for anything NOT starting with /api/
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      // If the build isn't present yet, show a basic OK so health checks pass
      res.status(200).send("OK");
    }
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
  console.error("❌ MONGO_URI is not set.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const server = app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

    // Graceful shutdown for containers
    const shutdown = (signal) => {
      console.log(`${signal} received. Closing server...`);
      server.close(() => {
        console.log("HTTP server closed.");
        mongoose.connection.close(false).then(() => {
          console.log("Mongo connection closed.");
          process.exit(0);
        });
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
