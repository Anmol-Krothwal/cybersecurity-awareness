// routes/tipsRoutes.js
const express = require("express");
const Tip = require("../models/Tips");

module.exports = ({ tipsReadLimiter, tipsWriteLimiter } = {}) => {
  const router = express.Router();

  // GET /api/tips  → approved tips
  if (tipsReadLimiter) router.get("/", tipsReadLimiter);
  router.get("/", async (_req, res, next) => {
    try {
      const tips = await Tip.find({ approved: true })
        .sort({ createdAt: -1 })
        .select("title text");
      res.json({ tips });
    } catch (e) { next(e); }
  });

  // POST /api/tips → submit suggestion (approved=false)
  if (tipsWriteLimiter) router.post("/", tipsWriteLimiter);
  router.post("/", async (req, res, next) => {
    try {
      const { title, text } = req.body || {};
      if (!title || !text) return res.status(400).json({ error: "title & text required" });
      const tip = await Tip.create({ title, text, approved: false });
      res.status(201).json({ ok: true, id: tip._id });
    } catch (e) { next(e); }
  });

  return router;
};
