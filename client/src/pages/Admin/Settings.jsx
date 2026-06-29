import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaSave, FaCog } from "react-icons/fa";

const Settings = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://celeb-dental-system.onrender.com/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setForm((prev) => ({
          ...prev,
          username: res.data.admin.username,
          email: res.data.admin.email || "",
        }));
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load profile details");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://celeb-dental-system.onrender.com/api/admin/update-profile",
        {
          username: form.username,
          email: form.email,
          password: form.password || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message);
      // Clear password fields
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <FaCog className="text-teal-700 animate-spin-slow" />
        Admin Settings
      </h1>

      <div className="max-w-xl bg-white rounded-3xl shadow-xl p-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Recovery Email (for OTP)
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="admin@celebritydental.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
              />
            </div>
          </div>

          <hr className="border-gray-150 my-6" />
          <h3 className="font-bold text-gray-700 mb-3">Change Password (Leave blank to keep current)</h3>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-700/30 transition duration-300 disabled:bg-teal-400 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaSave />
            <span>{loading ? "Saving Settings..." : "Save Settings"}</span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default Settings;
