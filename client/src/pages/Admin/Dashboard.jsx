import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data.appointments);
    } catch (err) {
      console.log(err);
    }
  };

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "Pending").length;
  const confirmed = appointments.filter(a => a.status === "Confirmed").length;
  const completed = appointments.filter(a => a.status === "Completed").length;
  const cancelled = appointments.filter(a => a.status === "Cancelled").length;

  const data = [
    { name: "Pending", value: pending },
    { name: "Confirmed", value: confirmed },
    { name: "Completed", value: completed },
    { name: "Cancelled", value: cancelled },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"];

  const Card = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className={`text-4xl ${color}`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Total"
          value={total}
          color="text-blue-600"
          icon={<FaCalendarCheck />}
        />

        <Card
          title="Pending"
          value={pending}
          color="text-yellow-500"
          icon={<FaClock />}
        />

        <Card
          title="Completed"
          value={completed}
          color="text-green-600"
          icon={<FaCheckCircle />}
        />

        <Card
          title="Cancelled"
          value={cancelled}
          color="text-red-500"
          icon={<FaTimesCircle />}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Appointment Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Recent Appointments
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Patient</th>
                <th className="text-left">Treatment</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.slice(0, 5).map(item => (
                <tr key={item._id} className="border-b">
                  <td className="py-3">{item.fullName}</td>
                  <td>{item.treatment}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;