const express = require("express");
const { 
  login, 
  forgotPassword, 
  verifyOtp, 
  resetPassword,
  getProfile,
  updateProfile
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// Protected routes (require auth middleware)
router.get("/profile", auth, getProfile);
router.put("/update-profile", auth, updateProfile);

module.exports = router;