import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-[145px] sm:w-[170px] md:w-64 shrink-0 min-h-screen bg-blue-700 text-white p-2 sm:p-3 md:p-6">
      {/* Logo */}
      <h2 className="text-sm sm:text-lg md:text-2xl font-bold mb-6 md:mb-8 whitespace-nowrap">
         <span className="hidden sm:inline">SmartCare</span>
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <LayoutDashboard size={18} className="shrink-0" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/doctors"
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <Users size={18} className="shrink-0" />
          Doctors
        </NavLink>

        <NavLink
          to="/admin/patients"
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <UserRound size={18} className="shrink-0" />
          Patients
        </NavLink>

        <NavLink
          to="/admin/appointments"
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <CalendarDays size={18} className="shrink-0" />
          Appointments
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded hover:bg-red-600 w-full mt-8 md:mt-10 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <LogOut size={18} className="shrink-0" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
