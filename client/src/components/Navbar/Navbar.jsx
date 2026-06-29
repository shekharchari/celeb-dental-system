import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <a href="#home">
          <div>
            <h1 className="text-2xl font-bold text-teal-700">
              CELEBRITY
            </h1>

            <p className="text-sm font-semibold text-gray-600">
              SUPERSPECIALITY DENTAL
            </p>
          </div>
        </a>

        {/* Menu */}
        <nav className="hidden lg:flex gap-8 font-medium text-gray-700">

          <a href="#home" className="hover:text-teal-700 transition">
            Home
          </a>

          <a href="#about" className="hover:text-teal-700 transition">
            About
          </a>

          <a href="#services" className="hover:text-teal-700 transition">
            Services
          </a>

          <a href="#doctors" className="hover:text-teal-700 transition">
            Doctors
          </a>

          <a href="#gallery" className="hover:text-teal-700 transition">
            Gallery
          </a>

          <a href="#contact" className="hover:text-teal-700 transition">
            Contact
          </a>

        </nav>

        {/* Buttons */}
        <div className="flex gap-3">

          <a
            href="tel:9392898492"
            className="hidden md:flex items-center gap-2 border border-teal-700 text-teal-700 px-5 py-3 rounded-full hover:bg-teal-700 hover:text-white transition"
          >
            <FaPhoneAlt />
            93928 98492
          </a>

          <Link
            to="/appointment"
            className="flex items-center gap-2 bg-teal-700 text-white px-5 py-3 rounded-full hover:bg-teal-800 transition"
          >
            <FaCalendarAlt />
            Book Appointment
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;