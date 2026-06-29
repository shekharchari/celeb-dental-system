import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h4 className="text-teal-700 font-bold uppercase">
            Contact Us
          </h4>

          <h2 className="text-4xl font-bold mt-3">
            Get In Touch
          </h2>

          <p className="text-gray-600 mt-4">
            We'd love to help you with your dental care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Details */}
          <div className="space-y-6">

            <div className="flex gap-4">
              <FaPhoneAlt className="text-teal-700 text-2xl mt-1" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p>93928 98492</p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaEnvelope className="text-teal-700 text-2xl mt-1" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p>celebritydental@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaMapMarkerAlt className="text-teal-700 text-2xl mt-1" />
              <div>
                <h3 className="font-bold">Address</h3>
                <p>
                  Sai Nagar Colony, ECIL,
                  <br />
                  Kushaiguda,
                  <br />
                  Hyderabad - 500062
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FaClock className="text-teal-700 text-2xl mt-1" />
              <div>
                <h3 className="font-bold">Working Hours</h3>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 9:00 PM</p>
              </div>
            </div>

          </div>

          {/* Google Map */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Celebrity+Superspeciality+Dental+Kushaiguda&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;