import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Book Appointment button
  const handleBookAppointment = () => {
    if (user) {
      // User is logged in
      navigate("/patient/book-appointment");
    } else {
      // User is not logged in
      navigate("/login");
    }
  };

  return (
    <section
      id="book"
      className="relative w-full bg-[#b6315e] py-14 md:py-16 overflow-hidden"
    >
      {/* Subtle Background Shape */}
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute -left-32 -bottom-32 w-80 h-80 rounded-full bg-[#10312C]/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ================= LEFT SIDE ================= */}
          <div className="text-white">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full">
              <CalendarDays size={15} />

              <span className="text-xs md:text-sm font-semibold tracking-wide">
                BOOK AN APPOINTMENT
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mt-5">
              Your health deserves
              <span className="block text-white/80 italic font-normal">
                the right care.
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm md:text-base leading-7 mt-5 max-w-xl">
              Schedule your appointment with our experienced doctors in just a
              few clicks. Get trusted healthcare, expert consultation, and
              compassionate treatment at CareNova Hospital.
            </p>

            {/* Button */}
            <button
              type="button"
              onClick={handleBookAppointment}
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-3
                bg-white
                text-[#b6315e]
                px-6
                md:px-7
                py-3.5
                rounded-md
                font-semibold
                text-sm
                md:text-base
                hover:bg-[#10312C]
                hover:text-white
                transition-all
                duration-300
                shadow-lg
              "
            >
              <CalendarDays size={18} />
              Book Appointment
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Emergency Info */}
            <div className="flex items-center gap-3 mt-7 pt-5 border-t border-white/20 max-w-md">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Clock3 size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">24/7 Emergency Support</p>

                <p className="text-xs text-white/60 mt-0.5">
                  Medical assistance available whenever you need it.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 shadow-xl">
            {/* Card Header */}
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-[#b6315e]/10 flex items-center justify-center shrink-0">
                <Stethoscope size={24} className="text-[#b6315e]" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#10312C]">
                  Why Book With Us?
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Simple, convenient and patient-focused healthcare.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-5 space-y-4">
              {/* Benefit 1 */}
              <div className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#b6315e] shrink-0 mt-0.5"
                />

                <div>
                  <h4 className="font-semibold text-[#10312C] text-sm md:text-base">
                    Experienced Specialists
                  </h4>

                  <p className="text-gray-500 text-xs md:text-sm mt-1 leading-5">
                    Qualified doctors across multiple medical specialties.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#b6315e] shrink-0 mt-0.5"
                />

                <div>
                  <h4 className="font-semibold text-[#10312C] text-sm md:text-base">
                    Easy Online Booking
                  </h4>

                  <p className="text-gray-500 text-xs md:text-sm mt-1 leading-5">
                    Schedule your appointment quickly and conveniently.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#b6315e] shrink-0 mt-0.5"
                />

                <div>
                  <h4 className="font-semibold text-[#10312C] text-sm md:text-base">
                    Quick Confirmation
                  </h4>

                  <p className="text-gray-500 text-xs md:text-sm mt-1 leading-5">
                    Get fast confirmation after submitting your appointment.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="text-[#b6315e] shrink-0 mt-0.5"
                />

                <div>
                  <h4 className="font-semibold text-[#10312C] text-sm md:text-base">
                    Patient-Focused Care
                  </h4>

                  <p className="text-gray-500 text-xs md:text-sm mt-1 leading-5">
                    Comfortable healthcare designed around your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="mt-6 bg-[#f2f7f5] rounded-lg px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[#10312C] text-xs font-semibold">
                  Need urgent assistance?
                </p>

                <p className="text-gray-500 text-[11px] mt-0.5">
                  Our emergency team is available 24/7.
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#b6315e] flex items-center justify-center shrink-0">
                <Clock3 size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
