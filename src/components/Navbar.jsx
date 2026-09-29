import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import api from "../services/api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [doctorsOpen, setDoctorsOpen] = useState(false);

  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);

  const token = !!user;

  // ===============================
  // FETCH DOCTORS
  // ===============================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/doctors/public");
        setDoctors(data.doctors || []);
      } catch (error) {
        console.log("Doctors API Error:", error);
      }
    };

    fetchDoctors();
  }, []);

  // ===============================
  // DASHBOARD
  // ===============================
  const handleDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;

      case "doctor":
        navigate("/doctor/dashboard");
        break;

      case "patient":
        navigate("/patient/dashboard");
        break;

      default:
        navigate("/");
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ===============================
  // SECTION CLICK
  // ===============================
  const handleSectionClick = (section) => {
    setServicesOpen(false);
    setDoctorsOpen(false);
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${section}`);

      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ===============================
            LOGO
        =============================== */}
        <Link to="/" className="flex items-center">
          <img
            className="hidden min-[500px]:block h-[47px]"
            src="/Logo1.png"
            alt="CareNova Hospital"
          />

          <p className="text-3xl font-bold text-[#b6315e]">CareNova Hospital</p>
        </Link>

        {/* ===============================
            DESKTOP MENU
        =============================== */}
        <div className="hidden lg:flex items-center gap-8">
          {/* HOME */}
          <NavLink to="/" className="hover:text-blue-600 transition">
            Home
          </NavLink>

          {/* ===============================
              SERVICES DROPDOWN
          =============================== */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => handleSectionClick("services")}
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              Services
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 pt-3 w-60">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    All Services
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    Cardiology
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    Neurology
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    General Medicine
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    Pediatrics
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    Laboratory
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    24/7 Emergency
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===============================
              DOCTORS DROPDOWN
          =============================== */}
          <div
            className="relative"
            onMouseEnter={() => setDoctorsOpen(true)}
            onMouseLeave={() => setDoctorsOpen(false)}
          >
            <button
              onClick={() => handleSectionClick("doctors")}
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              Doctors
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  doctorsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {doctorsOpen && (
              <div className="absolute top-full left-0 pt-3 w-64">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                  {/* ALL DOCTORS */}
                  <button
                    onClick={() => handleSectionClick("doctors")}
                    className="w-full text-left px-5 py-3 font-medium hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                  >
                    All Doctors
                  </button>

                  {/* DOCTORS FROM API */}
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <button
                        key={doctor._id}
                        onClick={() => handleSectionClick("doctors")}
                        className="w-full text-left px-5 py-3 hover:bg-[#fdf0f4] hover:text-[#b6315e] transition"
                      >
                        {doctor.userId?.name || "Doctor"}
                      </button>
                    ))
                  ) : (
                    <p className="px-5 py-3 text-sm text-gray-400">
                      No doctors available
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* BOOK APPOINTMENT */}
          <button
            onClick={() => handleSectionClick("book")}
            className="hover:text-blue-600 transition"
          >
            Book Appointment
          </button>

          {/* DASHBOARD */}
          {token && (
            <button
              onClick={handleDashboard}
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* ===============================
            RIGHT BUTTONS
        =============================== */}
        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="border border-[#b6315e] text-[#b6315e] px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#b6315e] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#b6315e] text-white px-11 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* ===============================
            MOBILE BUTTON
        =============================== */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ===============================
          MOBILE MENU
      =============================== */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="flex flex-col gap-4 p-6">
            {/* HOME */}
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            {/* ===============================
                MOBILE SERVICES
            =============================== */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full hover:text-blue-600"
              >
                <span>Services</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 border-[#b6315e]">
                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    All Services
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    Cardiology
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    Neurology
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    General Medicine
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    Pediatrics
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    Laboratory
                  </button>

                  <button
                    onClick={() => handleSectionClick("services")}
                    className="text-left px-4 py-2 hover:text-[#b6315e]"
                  >
                    24/7 Emergency
                  </button>
                </div>
              )}
            </div>

            {/* ===============================
                MOBILE DOCTORS
            =============================== */}
            <div>
              <button
                onClick={() => setDoctorsOpen(!doctorsOpen)}
                className="flex items-center justify-between w-full hover:text-blue-600"
              >
                <span>Doctors</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    doctorsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {doctorsOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 border-[#b6315e]">
                  <button
                    onClick={() => handleSectionClick("doctors")}
                    className="text-left px-4 py-2 font-medium hover:text-[#b6315e]"
                  >
                    All Doctors
                  </button>

                  {doctors.map((doctor) => (
                    <button
                      key={doctor._id}
                      onClick={() => handleSectionClick("doctors")}
                      className="text-left px-4 py-2 hover:text-[#b6315e]"
                    >
                      {doctor.userId?.name || "Doctor"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BOOK APPOINTMENT */}
            <button
              onClick={() => handleSectionClick("book")}
              className="text-left"
            >
              Book Appointment
            </button>

            {/* DASHBOARD */}
            {token && (
              <button
                onClick={() => {
                  handleDashboard();
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                Dashboard
              </button>
            )}

            {/* LOGIN / REGISTER / LOGOUT */}
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="border border-[#b6315e] text-[#b6315e] text-center py-2 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#b6315e] text-white text-center py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
