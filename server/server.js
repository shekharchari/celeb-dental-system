const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
console.log("✅ Loading Gallery Routes...");
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.get("/", (req, res) => {
  res.send("🚀 Celebrity Dental API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});