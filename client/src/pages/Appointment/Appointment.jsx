import { useState } from "react";
import axios from "axios";

const Appointment = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    appointmentDate: "",
    treatment: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/appointments",
      form
    );

    alert(res.data.message);

    setForm({
      fullName: "",
      phone: "",
      appointmentDate: "",
      treatment: "",
      message: "",
    });
  } catch (err) {
  console.log("FULL ERROR:", err);

  if (err.response) {
    console.log("Response:", err.response.data);
    alert(err.response.data.message);
  } else {
    alert(err.message);
  }
}
};

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px #ccc",
      }}
    >
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="treatment"
          placeholder="Treatment"
          value={form.treatment}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows="5"
        />

        <br /><br />

        <button type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;