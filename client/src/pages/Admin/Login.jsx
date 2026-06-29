import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTooth,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      return alert("Please enter username and password");
    }

    try {
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/admin/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-700 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center">
          <div className="bg-teal-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
            <FaTooth className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">
          Celebrity Dental
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Admin Panel Login
        </p>

        {/* Username */}

        <div className="mt-8 relative">
          <FaUser className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Password */}

        <div className="mt-5 relative">
          <FaLock className="absolute left-4 top-4 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-lg transition"
        >
          <div className="flex justify-center items-center gap-2">
            <FaUserShield />
            Login
          </div>
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">
          © 2026 Celebrity Superspeciality Dental
        </p>

      </div>

    </div>
  );
};

export default Login;