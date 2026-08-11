import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const DoctorLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= NAVBAR ================= */}
      {/* Navbar takes FULL width */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* ================= BELOW NAVBAR ================= */}
      <div className="flex min-h-[calc(100vh-70px)]">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-32 sm:w-48 md:w-64 shrink-0 min-h-[calc(100vh-72px)] bg-blue-700 text-white p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 md:mb-8">
            Doctor Panel
          </h2>

          <nav className="space-y-3">
            <Link
              to="/doctor/dashboard"
              className="block hover:bg-blue-600 p-2 sm:p-2.5 md:p-3 rounded-lg text-xs sm:text-sm md:text-base"
            >
              Dashboard
            </Link>

            <Link
              to="/doctor/appointments"
              className="block hover:bg-blue-600 p-2 sm:p-2.5 md:p-3 rounded-lg text-xs sm:text-sm md:text-base"
            >
              Appointments
            </Link>

            <button
              onClick={handleLogout}
              className="block hover:bg-red-600 p-2 sm:p-2.5 md:py-4  rounded-lg text-xs sm:text-sm md:text-base"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
