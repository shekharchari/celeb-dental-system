const Gallery = require("../models/Gallery");

// Add Image
const addImage = async (req, res) => {
  try {
    const image = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      message: "Image Uploaded Successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Images
const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Image
const deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addImage,
  getImages,
  deleteImage,
};