import {
  FaTooth,
  FaTeeth,
  FaSmile,
  FaUserMd,
  FaClinicMedical,
  FaStethoscope,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaTooth size={40} className="text-teal-700" />,
      title: "Root Canal Treatment",
      desc: "Advanced painless root canal procedures.",
    },
    {
      icon: <FaTeeth size={40} className="text-teal-700" />,
      title: "Dental Implants",
      desc: "Permanent replacement for missing teeth.",
    },
    {
      icon: <FaSmile size={40} className="text-teal-700" />,
      title: "Smile Designing",
      desc: "Enhance your smile with cosmetic dentistry.",
    },
    {
      icon: <FaUserMd size={40} className="text-teal-700" />,
      title: "Braces & Aligners",
      desc: "Straighten teeth comfortably and effectively.",
    },
    {
      icon: <FaClinicMedical size={40} className="text-teal-700" />,
      title: "General Checkup",
      desc: "Complete oral health examination.",
    },
    {
      icon: <FaStethoscope size={40} className="text-teal-700" />,
      title: "Kids Dentistry",
      desc: "Gentle dental care for children.",
    },
  ];

  return (
<section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h4 className="text-center text-teal-700 font-bold uppercase">
          Our Services
        </h4>

        <h2 className="text-4xl font-bold text-center mt-3">
          Complete Dental Care
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          We provide advanced dental treatments using modern technology for
          patients of all ages.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
            >
              {service.icon}

              <h3 className="text-2xl font-bold mt-5">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Services;