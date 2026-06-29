import doctor from "../../assets/images/doctor.png";

function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <img
          src={doctor}
          alt="Doctor"
          className="rounded-3xl shadow-xl w-full"
        />

        <div>
          <span className="text-teal-700 font-bold uppercase">
            About Our Clinic
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Celebrity Superspeciality Dental
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            We provide advanced dental care using modern technology in a
            comfortable and friendly environment. Our goal is to create healthy,
            confident smiles through personalized treatment plans.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">

            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl">106+</h3>
              <p>Google Reviews</p>
            </div>

            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl">5.0★</h3>
              <p>Patient Rating</p>
            </div>

            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl">Modern</h3>
              <p>Equipment</p>
            </div>

            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl">Friendly</h3>
              <p>Staff</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;