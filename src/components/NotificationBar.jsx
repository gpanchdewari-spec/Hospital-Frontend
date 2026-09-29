import { Bell, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationBar = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  const handleBookAppointment = () => {
    navigate("/patient/book-appointment");
  };

  return (
    <div className="bg-[#b6315e] text-white relative z-[60] h-10 overflow-hidden">
      {/* Sliding Content */}
      <div className="h-full flex items-center pr-12">
        <div className="notification-slide flex items-center gap-3 whitespace-nowrap">
          <Bell size={16} className="shrink-0" />

          <span className="text-xs sm:text-sm font-medium">
            Important Notice:
          </span>

          <span className="text-xs sm:text-sm">
            24/7 Emergency Services Available
          </span>

          <span className="opacity-70">•</span>

          <span className="text-xs sm:text-sm">
            Expert Doctors & Advanced Healthcare
          </span>

          <span className="opacity-70">•</span>

          <button
            onClick={handleBookAppointment}
            className="text-xs sm:text-sm font-semibold underline underline-offset-2 hover:text-yellow-200 transition cursor-pointer"
          >
            Book Appointment
          </button>

          <span className="opacity-70">•</span>

          {/* Repeat content for smooth continuous slide */}
          <Bell size={16} className="shrink-0" />

          <span className="text-xs sm:text-sm font-medium">
            Important Notice:
          </span>

          <span className="text-xs sm:text-sm">
            24/7 Emergency Services Available
          </span>

          <span className="opacity-70">•</span>

          <span className="text-xs sm:text-sm">
            Expert Doctors & Advanced Healthcare
          </span>

          <span className="opacity-70">•</span>

          <button
            onClick={handleBookAppointment}
            className="text-xs sm:text-sm font-semibold underline underline-offset-2 hover:text-yellow-200 transition cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      </div>

    

      {/* Animation */}
      <style>
        {`
          .notification-slide {
            animation: notificationSlide 22s linear infinite;
          }

          @keyframes notificationSlide {
            0% {
              transform: translateX(100%);
            }

            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotificationBar;
