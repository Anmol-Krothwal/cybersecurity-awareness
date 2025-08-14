const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    // "student" | "parent" | "teacher" | "other"
    ageGroup: { type: String, required: true },

    // --- Parent PIN (stored only on parent accounts)
    parentPinHash: { type: String, default: null },
    pinUpdatedAt: { type: Date, default: null },

    // --- Teen → Parent link
    parentEmail: { type: String, default: null, lowercase: true, trim: true },
    linkedParentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // --- Forgot password
    resetOtpHash: { type: String, default: null },
    resetOtpExpires: { type: Date, default: null },
    resetTokenHash: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

// Helpful index if you want faster lookups on parentEmail (not unique)
UserSchema.index({ parentEmail: 1 });

module.exports = mongoose.model("User", UserSchema);
