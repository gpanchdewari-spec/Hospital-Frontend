import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const slides = [
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

const WhyChooseCareNova = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("next");

      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection("next");

    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setDirection("prev");

    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <section className="w-full bg-[#f2f7f5] py-8 md:py-10">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-[2px] bg-[#b6315e]" />

          <span className="text-[#b6315e] text-[11px] font-semibold tracking-[0.18em]">
            WHY CHOOSE US
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#10312C]">
            Why Choose CareNova?
          </h2>

          <span className="hidden sm:block text-xs text-gray-400">
            0{currentSlide + 1} / 04
          </span>
        </div>
      </div>

      {/* ================= NOTIFICATION STYLE SLIDER ================= */}
      <div className="w-full bg-[#b6315e] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="relative h-[72px] sm:h-[76px] flex items-center overflow-hidden">
            {/* Moving Content */}
            <div className="flex-1 overflow-hidden">
              <div
                key={currentSlide}
                className={`flex items-center gap-3 ${
                  direction === "next"
                    ? "notification-slide-next"
                    : "notification-slide-prev"
                }`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>

                {/* Text */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    {slide.title}
                  </span>

                  <span className="hidden md:block text-white/50">•</span>

                  <span className="hidden md:block text-white/80 text-sm truncate">
                    {slide.text}
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
                  w-8
                  h-8
                  rounded-full
                  border
                  border-white/35
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-[#b6315e]
                  transition
                "
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dots */}
              <div className="hidden sm:flex items-center gap-1.5 mx-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
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
                  w-8
                  h-8
                  rounded-full
                  border
                  border-white/35
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-[#b6315e]
                  transition
                "
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          .notification-slide-next {
            animation: notificationNext 0.55s ease-out;
          }

          .notification-slide-prev {
            animation: notificationPrev 0.55s ease-out;
          }

          @keyframes notificationNext {
            from {
              opacity: 0;
              transform: translateX(80px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes notificationPrev {
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

export default WhyChooseCareNova;
