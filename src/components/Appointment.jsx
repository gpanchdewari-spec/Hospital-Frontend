import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleBookAppointment = () => {
    if (user) {
      navigate("/patient/book-appointment");
    } else {
      navigate("/login");
    }
  };
  return (
    <section id="book" className="bg-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">
              Book Appointment
            </span>

            <h2 className="text-5xl font-bold text-white mt-6 leading-tight">
              Need Medical Assistance?
            </h2>

            <p className="text-blue-100 text-lg mt-6 leading-8">
              Schedule your appointment with our experienced doctors in just a
              few clicks. Get quality healthcare, expert consultation, and
              compassionate treatment at SmartCare Hospital.
            </p>
            <button className="bg-white px-4 text-[#b6315e] cursor font-semibold hover:bg-[#b6315e] hover:text-white  md:px-[80px] py-4 mt-[20px]  rounded-[5px]" onClick={handleBookAppointment}>
              Book Appointment
            </button>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl text-[#b6315e] font-bold mb-6">
              Why Book With Us?
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="text-2xl">✔</span>
                <div>
                  <h4 className="font-semibold text-[#b6315e]">
                    Experienced Specialists
                  </h4>
                  <p className="text-gray-500">
                    Highly qualified doctors across multiple specialties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">✔</span>
                <div>
                  <h4 className="font-semibold text-[#b6315e]">
                    Easy Online Booking
                  </h4>
                  <p className="text-gray-500">
                    Schedule appointments quickly and conveniently.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">✔</span>
                <div>
                  <h4 className="font-semibold text-[#b6315e]">
                    Fast Confirmation
                  </h4>
                  <p className="text-gray-500">
                    Receive quick appointment confirmation from our team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">✔</span>
                <div>
                  <h4 className="font-semibold text-[#b6315e]">
                    24/7 Emergency Support
                  </h4>
                  <p className="text-gray-500">
                    Emergency medical assistance whenever you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
