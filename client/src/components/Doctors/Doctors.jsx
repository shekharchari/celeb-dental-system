import { useEffect, useState } from "react";
import axios from "axios";
import { FaAward, FaUserMd } from "react-icons/fa";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "https://celeb-dental-system.onrender.com/api/doctors"
      );

      setDoctors(res.data.doctors);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h4 className="text-teal-700 font-bold uppercase">
            Meet Our Doctors
          </h4>

          <h2 className="text-4xl font-bold mt-3">
            Our Expert Team
          </h2>

          <p className="text-gray-600 mt-4">
            Experienced specialists dedicated to providing world-class dental care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 transition duration-300"
            >
              <img
                src={`https://celeb-dental-system.onrender.com${doctor.image}`}
                alt={doctor.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6">

                <div className="flex items-center gap-2 mb-3">
                  <FaUserMd className="text-teal-700 text-xl" />
                  <h3 className="text-2xl font-bold">
                    {doctor.name}
                  </h3>
                </div>

                <p className="text-teal-700 font-semibold">
                  {doctor.specialization}
                </p>

                <p className="text-gray-600 mt-3">
                  {doctor.qualification}
                </p>

                <div className="flex justify-between mt-6">

                  <div className="bg-teal-50 rounded-xl p-4 flex-1 mr-2 text-center">
                    <FaAward className="mx-auto text-teal-700 text-2xl mb-2" />
                    <p className="font-bold">
                      {doctor.experience}
                    </p>
                    <small>Experience</small>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-4 flex-1 ml-2 text-center">
                    <FaAward className="mx-auto text-teal-700 text-2xl mb-2" />
                    <p className="font-bold">
                      5.0 ★
                    </p>
                    <small>Rating</small>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Doctors;