import doctor from "../../assets/images/doctor.png";
import { FaStar, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
  id="home"
  className="bg-gradient-to-br from-white via-teal-50 to-cyan-50 py-20"
>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold shadow">
            <FaStar />
            Rated 5.0 ★ | 106+ Google Reviews
          </div>

          <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Creating
            <br />
            Beautiful &
            <br />
            Healthy Smiles
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            Celebrity Superspeciality Dental provides advanced dental
            treatments including Dental Implants, Root Canal Treatment,
            Braces, Aligners, Smile Designing and Cosmetic Dentistry in
            Kushaiguda, Hyderabad.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

           <Link
  to="/appointment"
  className="bg-teal-700 hover:bg-teal-800 text-white px-7 py-4 rounded-full flex items-center gap-3 transition"
>
  <FaCalendarAlt />
  Book Appointment
</Link>

            <button className="border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white px-7 py-4 rounded-full flex items-center gap-3 transition">

              <FaPhoneAlt />

              Call Now

            </button>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">

            <div>
              <h2 className="text-3xl font-bold text-teal-700">106+</h2>
              <p className="text-gray-600">Reviews</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-teal-700">5.0★</h2>
              <p className="text-gray-600">Rating</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-teal-700">9AM</h2>
              <p className="text-gray-600">Open Daily</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-teal-700">100%</h2>
              <p className="text-gray-600">Patient Care</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex justify-center">

          <div className="absolute w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-40"></div>

          <img
            src={doctor}
            alt="Doctor"
            className="relative w-full max-w-md rounded-[30px] shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;