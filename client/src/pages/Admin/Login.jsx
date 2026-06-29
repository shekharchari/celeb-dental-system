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
  FaKey,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login"); // login, forgot, verify, reset
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
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
      setLoading(true);
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/admin/login",
        { username: form.username, password: form.password }
      );

      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!form.username) {
      return alert("Please enter your admin username");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/admin/forgot-password",
        { username: form.username }
      );
      alert(res.data.message);
      setMode("verify");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!form.otp) {
      return alert("Please enter the 6-digit OTP");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/admin/verify-otp",
        { username: form.username, otp: form.otp }
      );
      alert(res.data.message);
      setMode("reset");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!form.newPassword || !form.confirmPassword) {
      return alert("Please fill both password fields");
    }

    if (form.newPassword !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://celeb-dental-system.onrender.com/api/admin/reset-password",
        {
          username: form.username,
          otp: form.otp,
          newPassword: form.newPassword,
        }
      );
      alert(res.data.message);
      setForm({ username: "", password: "", otp: "", newPassword: "", confirmPassword: "" });
      setMode("login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
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
          {mode === "login" && "Admin Panel Login"}
          {mode === "forgot" && "Reset Password - Step 1"}
          {mode === "verify" && "Reset Password - Step 2"}
          {mode === "reset" && "Reset Password - Step 3"}
        </p>

        {/* LOGIN MODE */}
        {mode === "login" && (
          <div className="mt-8 space-y-5">
            {/* Username */}
            <div className="relative">
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
            <div className="relative">
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                onClick={() => setMode("forgot")}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-lg transition disabled:bg-teal-400 cursor-pointer"
            >
              <div className="flex justify-center items-center gap-2">
                <FaUserShield />
                {loading ? "Logging in..." : "Login"}
              </div>
            </button>
          </div>
        )}

        {/* FORGOT OTP MODE */}
        {mode === "forgot" && (
          <div className="mt-8 space-y-5">
            <p className="text-gray-600 text-sm text-center">
              Enter your admin username to request a 6-digit verification code.
            </p>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Admin Username"
                value={form.username}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-lg transition disabled:bg-teal-400 cursor-pointer"
            >
              {loading ? "Sending..." : "Request OTP"}
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* VERIFY OTP MODE */}
        {mode === "verify" && (
          <div className="mt-8 space-y-5">
            <p className="text-gray-600 text-sm text-center">
              A 6-digit code was sent. If you're on a local server, please check your backend server console.
            </p>
            <div className="relative">
              <FaKey className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                name="otp"
                placeholder="6-Digit OTP"
                maxLength="6"
                value={form.otp}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-lg transition disabled:bg-teal-400 cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setMode("forgot")}
              className="w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              Back
            </button>
          </div>
        )}

        {/* RESET PASSWORD MODE */}
        {mode === "reset" && (
          <div className="mt-8 space-y-5">
            <p className="text-gray-600 text-sm text-center">
              Create your new strong password.
            </p>
            
            {/* New Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
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

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-lg transition disabled:bg-teal-400 cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        <p className="text-center text-gray-400 text-sm mt-8">
          © 2026 Celebrity Superspeciality Dental
        </p>
      </div>
    </div>
  );
};

export default Login;