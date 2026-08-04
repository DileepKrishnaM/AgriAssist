const express = require("express");

const {
    sendOTP,
    verifyOTP,
    login,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// Authentication Routes
// ===============================

// Send OTP
router.post("/send-otp", sendOTP);

// Verify OTP & Register User
router.post("/verify-otp", verifyOTP);

// Login
router.post("/login", login);

// ===============================
// Protected Route (Testing JWT)
// ===============================
router.get("/profile", protect, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user,
    });

});

module.exports = router;