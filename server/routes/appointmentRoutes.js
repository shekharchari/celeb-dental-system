const express = require("express");

const {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

// Book Appointment
router.post("/", createAppointment);

// Get All Appointments
router.get("/", getAppointments);

// Update Appointment Status
router.put("/:id", updateAppointmentStatus);

// Delete Appointment
router.delete("/:id", deleteAppointment);

module.exports = router;