import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

 const { user, logout } = useContext(AuthContext);

 const token = !!user;
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

 const handleLogout = () => {
   logout();
   navigate("/");
 };


 const handleSectionClick = (section) => {
   if (location.pathname !== "/") {
     navigate(`/#${section}`);
   } else {
     document.getElementById(section)?.scrollIntoView({
       behavior: "smooth",
     });
   }
 };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex">
          <img
            className="hidden min-[500px]:block h-[47px] flex"
            src="/Logo1.png"
            alt=""
          />
          <p className="text-3xl font-bold text-[#b6315e]">CareNova Hospital</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>

          <button
            onClick={() => handleSectionClick("services")}
            className=" hover:text-blue-600"
          >
            Services
          </button>

          <button
            onClick={() => handleSectionClick("doctors")}
            className="hover:text-blue-600"
          >
            Doctors
          </button>

          <button
            onClick={() => handleSectionClick("book")}
            className="hover:text-blue-600"
          >
            Book Appointment
          </button>

          {token && (
            <button onClick={handleDashboard} className="hover:text-blue-600">
              Dashboard
            </button>
          )}
        </div>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="border border-[#b6315e] text-[#b6315e] px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#b6315e] text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#b6315e] text-white px-11 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="flex flex-col gap-4 p-6">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>

            <a href="#doctors" onClick={() => setMenuOpen(false)}>
              Doctors
            </a>

            <a href="#book" onClick={() => setMenuOpen(false)}>
              Book Appointment
            </a>

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

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="border border-blue-600 text-center py-2 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 text-white text-center py-2 rounded-lg"
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
