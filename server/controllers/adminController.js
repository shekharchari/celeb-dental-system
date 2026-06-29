const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Optional email transporter setup (using credentials if present in .env)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      "celebDentalSecret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login Successful",
      token,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 1. Forgot Password - Generates OTP
const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin username not found",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await admin.save();

    // Log in console for testing/development
    console.log(`\n🔑 [OTP VERIFICATION] OTP for admin password reset: ${otp}\n`);

    // Try sending email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: admin.email || "admin@celebritydental.com",
          subject: "Password Reset OTP - Celebrity Dental",
          text: `Your OTP for resetting the admin password is: ${otp}. It is valid for 10 minutes.`,
        });
      } catch (mailErr) {
        console.log("Mail Send Error:", mailErr.message);
      }
    }

    res.json({
      success: true,
      message: "OTP sent successfully. Please check your email (or server logs).",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 2. Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username",
      });
    }

    if (!admin.otp || admin.otp !== otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 3. Reset Password
const resetPassword = async (req, res) => {
  try {
    const { username, otp, newPassword } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username",
      });
    }

    if (!admin.otp || admin.otp !== otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.json({
      success: true,
      message: "Password reset successfully. You can now login.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 4. Get Profile (Settings)
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password -otp -otpExpires");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    res.json({
      success: true,
      admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 5. Update Profile (Settings)
const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (username) {
      const existing = await Admin.findOne({ username, _id: { $ne: req.adminId } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
      admin.username = username;
    }

    if (email) {
      admin.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    res.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
};