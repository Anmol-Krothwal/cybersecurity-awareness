const express = require("express");
const { verifyParentPin, setParentPin } = require("../controllers/authController");

// If you have JWT middleware, import and use it for setPin:
// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Public verify endpoint used by teen login modal:
router.post("/verify", verifyParentPin);

// Optional: parent can update their PIN when logged in
// router.post("/set-pin", requireAuth, setParentPin);

module.exports = router;
