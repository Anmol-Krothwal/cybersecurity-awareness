const express = require("express");
const {
  signup,
  login,
  forgotStart,
  forgotVerify,
  forgotReset,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Forgot-password flow
router.post("/forgot/start", forgotStart);
router.post("/forgot/verify", forgotVerify);
router.post("/forgot/reset", forgotReset);

module.exports = router;
