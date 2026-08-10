import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Hero = () => {
  const { user } = useContext(AuthContext);
const navigate = useNavigate();


const handleBookAppointment = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/login");
    return;
  }

  if (user.role === "patient") {
    navigate("/patient/book-appointment");
  } else if (user.role === "doctor") {
    navigate("/doctor/dashboard");
  } else if (user.role === "admin") {
    navigate("/admin/dashboard");
  }
};



  return (
    <section className="bg-[#f2f7f5] grid-bg min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            🏥 Trusted Healthcare Since 2001
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight text-blue-600">
            Your Health,
            <br />
            <span className="text-[#b6315e]">Our Priority</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            CareNova Hospital provides world-class healthcare with experienced
            doctors, advanced technology, modern facilities, and compassionate
            care for every patient.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleBookAppointment}
              className="bg-[#b6315e] hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition"
            >
              Book Appointment
              <CalendarCheck size={20} />
            </button>

            <Link
              to={
                user
                  ? user.role === "admin"
                    ? "/admin/dashboard"
                    : user.role === "doctor"
                      ? "/doctor/dashboard"
                      : "/patient/dashboard"
                  : "/login"
              }
              className="border-2 border-[#b6315e] text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl flex items-center gap-2 transition"
            >
              Dashboard
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-14">
            <div>
              <h2 className="text-4xl font-bold text-blue-600">50+</h2>

              <p className="text-gray-600 mt-2">Expert Doctors</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-600">10K+</h2>

              <p className="text-gray-600 mt-2">Happy Patients</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-600">24/7</h2>

              <p className="text-gray-600 mt-2">Emergency Care</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center ">
          <img
            src="/hero.png"
            alt="Doctor"
            className="rounded-3xl h-[550px] object-cover transition-all duration-500 ease-in-out hover:scale-105 hover:rotate-3"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
