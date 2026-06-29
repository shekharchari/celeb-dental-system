import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";

const Doctors = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    qualification: "",
    image: "",
  });

  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data.doctors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    if (
      !form.name ||
      !form.specialization ||
      !form.experience ||
      !form.qualification
    ) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctors",
        form
      );

      alert(res.data.message);

      setForm({
        name: "",
        specialization: "",
        experience: "",
        qualification: "",
        image: "",
      });

      fetchDoctors();
    } catch (err) {
      console.log(err);
      alert("Failed to add doctor");
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${id}`
      );

      fetchDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        👨‍⚕️ Doctor Management
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-2 gap-6">

          <input
            className="border rounded-lg p-4"
            placeholder="Doctor Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="border rounded-lg p-4"
            placeholder="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
          />

          <input
            className="border rounded-lg p-4"
            placeholder="Experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
          />

          <input
            className="border rounded-lg p-4"
            placeholder="Qualification"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <label className="block font-semibold mb-3">
              Doctor Photo
            </label>

            <ImageUpload
              onUpload={(imagePath) =>
                setForm({ ...form, image: imagePath })
              }
            />

            {form.image && (
              <img
                src={`http://localhost:5000${form.image}`}
                alt="Doctor"
                className="mt-4 w-32 h-32 rounded-lg border object-cover"
              />
            )}
          </div>

        </div>

        <button
          onClick={addDoctor}
          className="mt-8 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          ➕ Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">

          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Qualification</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4 text-center">
                  {doctor.image ? (
                    <img
                      src={`http://localhost:5000${doctor.image}`}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                      No
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 text-center font-semibold">
                  {doctor.name}
                </td>

                <td className="px-6 py-4 text-center">
                  {doctor.specialization}
                </td>

                <td className="px-6 py-4 text-center">
                  {doctor.experience}
                </td>

                <td className="px-6 py-4 text-center">
                  {doctor.qualification}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Doctors;