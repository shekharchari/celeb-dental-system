import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Gallery from "./pages/Admin/Gallery";
import Home from "./pages/Home/Home";
import Appointment from "./pages/Appointment/Appointment";

import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import Doctors from "./pages/Admin/Doctors";
import AdminLayout from "./pages/Admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />

        {/* Admin Login */}
        <Route path="/admin" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Appointments */}
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Appointments />} />
        </Route>
        <Route
  path="/gallery"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Gallery />} />
</Route>

        {/* Doctors */}
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Doctors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;