import { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data.appointments);
    } catch (err) {
      console.log(err);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/appointments/${id}`
      );

      alert(res.data.message);
      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        { status }
      );

      alert(res.data.message);
      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Status Update Failed");
    }
  };

  const filteredAppointments = appointments.filter((item) =>
    item.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Treatment</th>
              <th>Message</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-4 font-semibold">{item.fullName}</td>

                <td>{item.phone}</td>

                <td>
                  {new Date(item.appointmentDate).toLocaleDateString()}
                </td>

                <td>{item.treatment}</td>

                <td>{item.message}</td>

                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                    className={`px-3 py-2 rounded-lg text-white font-semibold
                      ${
                        item.status === "Pending"
                          ? "bg-yellow-500"
                          : item.status === "Confirmed"
                          ? "bg-blue-500"
                          : item.status === "Completed"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => deleteAppointment(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-8">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;