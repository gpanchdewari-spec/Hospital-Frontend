import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const whyChooseSlides = [
  {
    icon: Stethoscope,
    title: "Experienced Doctors",
    text: "Qualified specialists providing personalized and compassionate healthcare.",
  },
  {
    icon: HeartPulse,
    title: "Modern Facilities",
    text: "Modern healthcare facilities and technology for better diagnosis and treatment.",
  },
  {
    icon: Clock3,
    title: "24/7 Emergency Care",
    text: "Round-the-clock emergency medical support whenever you need it.",
  },
  {
    icon: ShieldCheck,
    title: "Patient-Centered Care",
    text: "Compassionate healthcare focused on your comfort, needs and wellbeing.",
  },
];

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Why Choose slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Auto moving slider
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("next");

      setCurrentSlide((prev) => (prev + 1) % whyChooseSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/doctors/public");
      console.log("Doctors API Response:", data);
      setDoctors(data.doctors || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setDirection("next");

    setCurrentSlide((prev) => (prev + 1) % whyChooseSlides.length);
  };

  const previousSlide = () => {
    setDirection("prev");

    setCurrentSlide(
      (prev) => (prev - 1 + whyChooseSlides.length) % whyChooseSlides.length,
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };

  const currentWhySlide = whyChooseSlides[currentSlide];
  const CurrentIcon = currentWhySlide.icon;

  return (
    <section
      id="doctors"
      className="bg-[#f3f7f6] grid-bg py-24 px-6 md:px-16 lg:px-20"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <p className="doc-sans text-xs tracking-[0.25em] uppercase text-[#da2990] font-medium mb-3">
          Verified Practitioners
        </p>

        <h1 className="doc-serif text-5xl md:text-6xl text-[#10312C] font-medium">
          Our Doctors
        </h1>
      </div>

      {/* =====================================================
          WHY CHOOSE CARENOVA - NOTIFICATION STYLE SLIDER
          ===================================================== */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="w-full bg-[#b6315e] text-white shadow-sm rounded-[6px] overflow-hidden">
          <div className="relative min-h-[72px] sm:min-h-[76px] flex items-center px-4 sm:px-6">
            {/* Moving Content */}
            <div className="flex-1 overflow-hidden">
              <div
                key={currentSlide}
                className={`flex items-center gap-3 ${
                  direction === "next"
                    ? "doctor-notification-next"
                    : "doctor-notification-prev"
                }`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <CurrentIcon size={18} />
                </div>

                {/* Text */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    {currentWhySlide.title}
                  </span>

                  <span className="hidden md:block text-white/50">•</span>

                  <span className="hidden md:block text-white/80 text-sm truncate">
                    {currentWhySlide.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 ml-3 shrink-0">
              {/* Previous */}
              <button
                onClick={previousSlide}
                className="
                  w-8 h-8
                  rounded-full
                  border border-white/35
                  flex items-center justify-center
                  hover:bg-white
                  hover:text-[#b6315e]
                  transition
                "
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dots */}
              <div className="hidden sm:flex items-center gap-1.5 mx-1">
                {whyChooseSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={nextSlide}
                className="
                  w-8 h-8
                  rounded-full
                  border border-white/35
                  flex items-center justify-center
                  hover:bg-white
                  hover:text-[#b6315e]
                  transition
                "
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Small supporting text */}
        <p className="doc-sans text-center text-[#10312C]/60 mt-4 text-sm md:text-base">
          Meet our team of trusted medical professionals, ready to provide
          expert care for you and your family.
        </p>
      </div>

      {/* ================= LOADING SKELETON ================= */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-1 p-6 h-80 animate-pulse border border-[#10312C]/5"
            />
          ))}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && doctors.length === 0 && (
        <p className="doc-sans text-center text-[#10312C]/50">
          No doctors are listed right now. Check back shortly.
        </p>
      )}

      {/* ================= DOCTOR GRID ================= */}
      {!loading && doctors.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="
                doc-card
                bg-white
                rounded-[7px]
                p-5
                pb-6
                border-1
                border-[#10312C]/[0.06]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_-15px_rgba(16,49,44,0.15)]
              "
            >
              {/* Avatar with seal ring + status dot */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="seal-ring w-full h-full rounded-full">
                  <img
                    src={doctor.profileImage || "/doctor-placeholder.png"}
                    alt={doctor.userId?.name || "Doctor"}
                    className="
                      w-full
                      h-full
                      rounded-full
                      object-cover
                      bg-[#FBF8F3]
                    "
                  />
                </div>

                <span
                  className="
                    pulse
                    absolute
                    bottom-0
                    right-0
                    w-4
                    h-4
                    rounded-full
                    bg-[#4C9A76]
                    border-2
                    border-white
                  "
                />
              </div>

              {/* Name */}
              <h2
                className="
                  doc-serif
                  text-xl
                  text-[#10312C]
                  text-center
                  font-medium
                  leading-snug
                "
              >
                {doctor.userId?.name}
              </h2>

              {/* Specialization */}
              <div className="flex justify-center mt-2 mb-4">
                <span
                  className="
                    doc-sans
                    text-[11px]
                    tracking-wide
                    uppercase
                    font-medium
                    text-[#B8863B]
                    bg-[#B8863B]/[0.08]
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {doctor.specialization}
                </span>
              </div>

              {/* Qualification */}
              <p className="doc-sans text-center text-sm text-[#10312C]/70">
                {doctor.qualification}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#10312C]/[0.07] my-4" />

              {/* Stats */}
              <div className="flex justify-between items-center doc-sans text-sm mb-6">
                <div className="text-[#10312C]/60">
                  <span className="font-semibold text-[#10312C]">
                    {doctor.experience}
                  </span>{" "}
                  yrs exp
                </div>

                <div className="font-semibold text-[#10312C]">
                  ₹{doctor.consultationFee}
                </div>
              </div>

              {/* Book Appointment */}
              <Link to={`/patient/book-appointment?doctorId=${doctor._id}`}>
                <button
                  className="
                    doc-sans
                    w-full
                    bg-[#b6315e]
                    cursor-pointer
                    text-white
                    text-sm
                    font-medium
                    py-3
                    rounded-[5px]
                    hover:bg-[#10312C]
                    transition-colors
                    duration-300
                  "
                >
                  Book Appointment
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ================= SLIDER ANIMATION ================= */}
      <style>
        {`
          .doctor-notification-next {
            animation: doctorNotificationNext 0.55s ease-out;
          }

          .doctor-notification-prev {
            animation: doctorNotificationPrev 0.55s ease-out;
          }

          @keyframes doctorNotificationNext {
            from {
              opacity: 0;
              transform: translateX(80px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes doctorNotificationPrev {
            from {
              opacity: 0;
              transform: translateX(-80px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default DoctorsSection;
