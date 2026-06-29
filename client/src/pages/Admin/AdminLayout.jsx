import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "250px",
          background: "#0f766e",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>🦷 Celebrity Dental</h2>
        <p>Admin Panel</p>

        <hr />

        <p>
          <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
        </p>

        <p>
          <Link to="/appointments" style={{ color: "#fff", textDecoration: "none" }}>
            Appointments
          </Link>
        </p>

        <p>
          <Link to="/doctors" style={{ color: "#fff", textDecoration: "none" }}>
            Doctors
          </Link>
        </p>
        <p>
  <Link to="/gallery" style={{ color: "#fff" }}>
    Gallery
  </Link>
</p>

        <p>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Website
          </Link>
        </p>

        <button
          onClick={logout}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "10px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;