const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getImages);
router.post("/", galleryController.addImage);
router.delete("/:id", galleryController.deleteImage);

module.exports = router;