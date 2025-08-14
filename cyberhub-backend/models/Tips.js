// models/Tip.js
const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    text:  { type: String, required: true, trim: true, maxlength: 240 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", TipSchema);
