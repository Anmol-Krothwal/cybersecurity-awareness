const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const parentRoutes = require("./routes/parentRoutes");
const tipsRoutes = require("./routes/tipsRoutes"); // tips router (factory)
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ---------------- Security & basic middleware ---------------- */
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // Allow embedding Google Maps iframes
        "frame-src": [
          "'self'",
          "https://www.google.com",
          "https://www.google.co.uk",
          "https://maps.google.com"
        ],
        // Some UAs still consult child-src
        "child-src": [
          "'self'",
          "https://www.google.com",
          "https://www.google.co.uk",
          "https://maps.google.com"
        ],
        // Images/tiles/assets used by Google embeds (and your site)
        "img-src": [
          "'self'",
          "data:",
          "https:",
          "https://*.google.com",
          "https://*.gstatic.com",
          "https://*.googleapis.com"
        ],
        // If you ever switch to Maps JS API, these help
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://www.google.com",
          "https://maps.googleapis.com"
        ],
        "style-src": ["'self'", "'unsafe-inline'", "https:", "https://fonts.googleapis.com"],
        "connect-src": ["'self'", "https://maps.googleapis.com", "https://maps.gstatic.com"]
      }
    },
    // If you serve images/styles from CDNs, avoid CORP blocking
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",")
      : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Rate limits ---------------- */
app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 }));
app.use("/api/parent/verify", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }));

// Per-route rate limits for /api/tips
const tipsReadLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60 });
const tipsWriteLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });

/* ---------------- Health check ---------------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ---------------- API routes (before static & SPA fallback) ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/tips", tipsRoutes({ tipsReadLimiter, tipsWriteLimiter }));

// Contact route MUST be before Not Found handler
app.use(
  "/api/contact",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }),
  contactRoutes
);
console.log("➡️  /api/contact route mounted");

/* ---------------- Serve frontend static files ---------------- */
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

/* ---------------- SPA fallback (Express 5 safe) ---------------- */
// Match anything that does NOT start with /api/
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
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
// Mongoose v6+ / driver v4+ do not need useNewUrlParser/useUnifiedTopology
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
