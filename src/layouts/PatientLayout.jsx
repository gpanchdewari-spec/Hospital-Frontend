import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const PatientLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-32 sm:w-48 md:w-64 shrink-0 min-h-[calc(100vh-72px)] bg-blue-700 text-white p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 md:mb-8">
            Patient Panel
          </h2>

          <nav className="space-y-2 sm:space-y-3 md:space-y-4">
            <Link
              to="/patient/dashboard"
              className="block hover:bg-blue-600 p-2 sm:p-2.5 md:p-3 rounded-lg text-xs sm:text-sm md:text-base"
            >
              Dashboard
            </Link>

            <Link
              to="/patient/book-appointment"
              className="block hover:bg-blue-600 p-2 sm:p-2.5 md:p-3 rounded-lg text-xs sm:text-sm md:text-base"
            >
              Book Appointment
            </Link>

            <Link
              to="/patient/emergency"
              className="block hover:bg-red-600 p-3 rounded-lg"
            >
              Emergency Appointment
            </Link>

            <Link
              to="/patient/my-appointments"
              className="block hover:bg-blue-600 p-2 sm:p-2.5 md:p-3 rounded-lg text-xs sm:text-sm md:text-base"
            >
              My Appointments
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left hover:bg-red-600 p-2 sm:p-2.5 md:p-3 rounded-lg mt-6 md:mt-8 text-xs sm:text-sm md:text-base"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="bg-gray-100 p-3 sm:p-5 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;
