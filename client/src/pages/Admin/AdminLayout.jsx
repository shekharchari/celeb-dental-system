import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  FaChartBar, 
  FaCalendarAlt, 
  FaUserMd, 
  FaImages, 
  FaGlobe, 
  FaSignOutAlt, 
  FaTooth 
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { to: "/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
    { to: "/doctors", label: "Doctors", icon: <FaUserMd /> },
    { to: "/gallery", label: "Gallery", icon: <FaImages /> },
    { to: "/", label: "View Website", icon: <FaGlobe /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-6 shadow-xl sticky top-0 h-screen">
        <div>
          {/* Header/Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-teal-600 p-2.5 rounded-xl flex items-center justify-center">
              <FaTooth className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-wide">Celebrity Dental</h2>
              <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>

          <hr className="border-slate-800 mb-6" />

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/10"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`
                }
              >
                <span className="text-lg transition-transform group-hover:scale-110 duration-200">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer/Logout */}
        <div className="space-y-4">
          <hr className="border-slate-800" />
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition duration-200 shadow-lg shadow-red-600/15 cursor-pointer"
          >
            <FaSignOutAlt className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;