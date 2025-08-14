const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// ------------------------ AUTH ------------------------

const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    ageGroup,

    // parent signup
    parentalPin,

    // teen signup
    parentEmail,
    parentPin, // optional auto-link
  } = req.body;

  if (!name || !email || !password || !confirmPassword || !ageGroup) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const normalizedEmail = String(email).toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      ageGroup,
    });

    // If parent -> store 6-digit PIN
    if (ageGroup === "parent" && parentalPin) {
      const pinStr = String(parentalPin).trim();
      if (!/^\d{6}$/.test(pinStr)) return res.status(400).json({ message: "Parent PIN must be 6 digits" });
      user.parentPinHash = await bcrypt.hash(pinStr, 10);
      user.pinUpdatedAt = new Date();
    }

    // If teen -> store parentEmail; optional auto link if parentPin provided and correct
    if (ageGroup === "student") {
      const pEmail = (parentEmail || "").toLowerCase().trim();
      user.parentEmail = pEmail || null;

      if (pEmail && parentPin) {
        const parent = await User.findOne({ email: pEmail, ageGroup: "parent" });
        if (parent?.parentPinHash) {
          const ok = await bcrypt.compare(String(parentPin).trim(), parent.parentPinHash);
          if (ok) user.linkedParentId = parent._id;
        }
      }
    }

    await user.save();
    return res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const payload = {
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      ageGroup: user.ageGroup,
    };
    if (user.ageGroup === "student") {
      payload.parentEmail = user.parentEmail || "";
      payload.linkedParentId = user.linkedParentId || null;
    }

    return res.status(200).json(payload);
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// --------------------- PARENT PIN ---------------------

// Verify a parent's 6-digit PIN by email
const verifyParentPin = async (req, res) => {
  try {
    let { parentEmail, pin } = req.body;
    parentEmail = (parentEmail || "").toLowerCase().trim();
    pin = String(pin || "").trim();

    if (!parentEmail || !/^\d{6}$/.test(pin)) {
      return res.status(400).json({ ok: false, message: "Invalid email or pin" });
    }

    const parent = await User.findOne({ email: parentEmail, ageGroup: "parent" });
    if (!parent?.parentPinHash) {
      return res.status(404).json({ ok: false, message: "Parent not found or PIN not set" });
    }

    const ok = await bcrypt.compare(pin, parent.parentPinHash);
    if (!ok) return res.status(401).json({ ok: false, message: "Invalid PIN" });

    return res.json({ ok: true, parentId: parent._id });
  } catch (err) {
    console.error("Verify PIN Error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// (Optional) allow logged-in parents to set/change PIN
// Only wire this if you add auth middleware.
// const setParentPin = async (req, res) => { ... }

// ------------------ FORGOT PASSWORD ------------------

const forgotStart = async (req, res) => {
  try {
    let { email } = req.body || {};
    email = (email || "").toLowerCase().trim();
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });

    // Always generate an OTP (avoid user enumeration)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    if (user) {
      user.resetOtpHash = otpHash;
      user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      // clear any previous token
      user.resetTokenHash = null;
      user.resetTokenExpires = null;
      await user.save();
      console.log(`[forgot] OTP for ${email}: ${otp}`); // dev log; replace with email service in prod
    }

    const payload = { ok: true };
    if (process.env.NODE_ENV !== "production") payload.devOtp = otp; // dev convenience
    return res.json(payload);
  } catch (e) {
    console.error("forgotStart error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotVerify = async (req, res) => {
  try {
    let { email, otp } = req.body || {};
    email = (email || "").toLowerCase().trim();
    otp = String(otp || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.resetOtpHash || !user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const ok = await bcrypt.compare(otp, user.resetOtpHash);
    if (!ok) return res.status(401).json({ message: "Incorrect OTP" });

    // issue short-lived reset token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    user.resetTokenHash = tokenHash;
    user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    // clear OTP
    user.resetOtpHash = null;
    user.resetOtpExpires = null;
    await user.save();

    return res.json({ ok: true, resetToken: token });
  } catch (e) {
    console.error("forgotVerify error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotReset = async (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) return res.status(400).json({ message: "Missing data" });

    const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");
    const user = await User.findOne({
      resetTokenHash: tokenHash,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetTokenHash = null;
    user.resetTokenExpires = null;
    await user.save();

    return res.json({ ok: true });
  } catch (e) {
    console.error("forgotReset error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  verifyParentPin,
  forgotStart,
  forgotVerify,
  forgotReset,
  // setParentPin, // if you later add it
};
