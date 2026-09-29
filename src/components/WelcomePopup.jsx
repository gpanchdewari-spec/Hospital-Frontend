import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("carenova_welcome");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("carenova_welcome", "true");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent background scrolling while popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  if (!showPopup) return null;

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAppointment = () => {
    closePopup();
    navigate("/patient/book-appointment");
  };

  const handleServices = () => {
    closePopup();

    setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#10312C]/70
        backdrop-blur-sm
        px-4
        popup-overlay
      "
    >
      {/* Popup */}
      <div
        className="
          relative
          w-full
          max-w-[520px]
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          popup-box
        "
      >
        {/* Top Pink Section */}
        <div className="relative bg-[#b6315e] px-6 sm:px-8 pt-7 pb-8 text-white">
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="
              absolute
              top-4
              right-4
              w-8
              h-8
              rounded-full
              bg-white/15
              hover:bg-white
              hover:text-[#b6315e]
              flex
              items-center
              justify-center
              transition
            "
            aria-label="Close popup"
          >
            <X size={18} />
          </button>

          {/* Small Label */}
          <p className="text-white/70 text-[10px] sm:text-xs font-semibold tracking-[0.2em]">
            WELCOME TO
          </p>

          {/* Hospital Name */}
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2">
            CareNova
            <span className="font-normal"> Hospital</span>
          </h2>

          <p className="text-white/80 text-sm mt-2 max-w-md">
            Compassionate care, experienced doctors, and modern healthcare
            facilities — all under one roof.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center gap-2 mt-5">
            <span className="w-10 h-[2px] bg-white" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="px-6 sm:px-8 py-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#10312C]">
            Your health is our priority.
          </h3>

          <p className="text-gray-500 text-sm leading-6 mt-2">
            Get the care you need from trusted medical professionals. Schedule
            an appointment or explore our healthcare services.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Appointment */}
            <button
              onClick={handleAppointment}
              className="
                group
                flex-1
                flex
                items-center
                justify-center
                gap-2
                bg-[#b6315e]
                text-white
                px-5
                py-3
                rounded-lg
                text-sm
                font-semibold
                hover:bg-[#10312C]
                transition-all
                duration-300
              "
            >
              <CalendarDays size={17} />
              Book Appointment
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Services */}
            <button
              onClick={handleServices}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                border
                border-[#10312C]/20
                text-[#10312C]
                px-5
                py-3
                rounded-lg
                text-sm
                font-semibold
                hover:bg-[#f2f7f5]
                transition
              "
            >
              Explore Services
            </button>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-[10px] text-gray-400 mt-5">
            Trusted care for you and your family
          </p>
        </div>
      </div>

      <style>
        {`
          .popup-overlay {
            animation: popupOverlayIn 0.25s ease-out;
          }

          .popup-box {
            animation: popupBoxIn 0.35s ease-out;
          }

          @keyframes popupOverlayIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popupBoxIn {
            from {
              opacity: 0;
              transform: scale(0.94) translateY(15px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomePopup;
