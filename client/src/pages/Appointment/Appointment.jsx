import { useState } from "react";
import axios from "axios";
import { 
  FaUser, 
  FaPhone, 
  FaCalendarAlt, 
  FaStethoscope, 
  FaCommentAlt, 
  FaTooth, 
  FaClock, 
  FaMapMarkerAlt 
} from "react-icons/fa";

const Appointment = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    appointmentDate: "",
    treatment: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/appointments",
        form
      );

      alert(res.data.message);

      // Construct the WhatsApp message with appointment details
      const formattedDate = new Date(form.appointmentDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const messageText = `Hello Celebrity Dental, I just booked an appointment on your website!\n\n📋 *APPOINTMENT DETAILS:*\n👤 *Patient Name:* ${form.fullName}\n📞 *Phone Number:* ${form.phone}\n📅 *Date:* ${formattedDate}\n🦷 *Treatment:* ${form.treatment}\n💬 *Message:* ${form.message || "None"}`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/919392898492?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

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
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5">
        
        {/* Info Column (2/5 width) */}
        <div className="md:col-span-2 bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <FaTooth className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold tracking-wide">Celebrity Dental</h2>
            </div>
            
            <h3 className="text-3xl font-extrabold mb-4 leading-tight">
              Book Your Appointment Today
            </h3>
            <p className="text-teal-100 mb-8 text-sm leading-relaxed">
              Experience world-class dental care with our team of specialists. Fill out the form to schedule your visit.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaClock className="text-teal-300 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-sm">Working Hours</h4>
                <p className="text-teal-100 text-xs mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-teal-100 text-xs">Sunday: Closed</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhone className="text-teal-300 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-sm">Contact Support</h4>
                <p className="text-teal-100 text-xs mt-0.5">+91 93928 98492</p>
                <p className="text-teal-100 text-xs">support@celebritydental.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-teal-300 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-sm">Location</h4>
                <p className="text-teal-100 text-xs mt-0.5">Kushaiguda, Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (3/5 width) */}
        <form onSubmit={handleSubmit} className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Request Appointment</h2>
            <p className="text-gray-500 text-sm mt-1">Please provide your details below.</p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="date"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition text-gray-700"
                  />
                </div>
              </div>

              {/* Treatment */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Treatment / Service
                </label>
                <div className="relative">
                  <FaStethoscope className="absolute left-4 top-3.5 text-gray-400" />
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition text-gray-700 appearance-none"
                  >
                    <option value="" disabled>Select Treatment</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Dental Whitening">Teeth Whitening</option>
                    <option value="Root Canal Treatment">Root Canal</option>
                    <option value="Braces & Invisalign">Braces & Aligners</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Tooth Extraction">Tooth Extraction</option>
                    <option value="Other">Other Treatment</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Additional Message
              </label>
              <div className="relative">
                <FaCommentAlt className="absolute left-4 top-3.5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Let us know if you have any dental issues or requests..."
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-700/30 transition duration-300 disabled:bg-teal-400 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Scheduling Visit...</span>
            ) : (
              <>
                <FaCalendarAlt />
                <span>Book Appointment</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Appointment;