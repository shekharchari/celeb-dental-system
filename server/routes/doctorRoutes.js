const express = require("express");

const {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

// Add Doctor
router.post("/", addDoctor);

// Get All Doctors
router.get("/", getDoctors);

// Update Doctor
router.put("/:id", updateDoctor);

// Delete Doctor
router.delete("/:id", deleteDoctor);

module.exports = router;