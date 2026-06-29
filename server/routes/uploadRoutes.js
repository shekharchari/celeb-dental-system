const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      image: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;