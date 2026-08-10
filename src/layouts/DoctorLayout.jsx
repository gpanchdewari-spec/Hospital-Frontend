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
        <aside className="w-64 shrink-0 bg-blue-700 text-white p-5">
          <h2 className="text-2xl font-bold mb-8">Doctor Panel</h2>

          <nav className="space-y-3">
            <Link
              to="/doctor/dashboard"
              className="block hover:bg-blue-600 p-3 rounded"
            >
              Dashboard
            </Link>

            <Link
              to="/doctor/appointments"
              className="block hover:bg-blue-600 p-3 rounded"
            >
              Appointments
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left hover:bg-red-600 p-3 rounded mt-8"
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
