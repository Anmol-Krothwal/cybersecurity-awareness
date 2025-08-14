// routes/contactRoutes.js
const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }
    await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      userAgent: req.get("user-agent"),
      ip: req.ip,
    });
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

module.exports = router;
