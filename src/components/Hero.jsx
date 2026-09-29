import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Phone,
} from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=90",
    smallTitle: "CARE THAT PUTS YOU FIRST",
    title: "Healthcare you can",
    highlight: "trust.",
    description:
      "Experienced doctors, modern facilities, and compassionate care — all focused on helping you and your family stay healthy.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=2000&q=90",
    smallTitle: "EXPERT MEDICAL CARE",
    title: "Specialists who care about",
    highlight: "your wellbeing.",
    description:
      "Access experienced medical professionals across multiple specialties with personalized care for every patient.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=2000&q=90",
    smallTitle: "MODERN HEALTHCARE",
    title: "Better care for a",
    highlight: "healthier tomorrow.",
    description:
      "From diagnosis to treatment, we combine medical expertise and modern healthcare facilities under one roof.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="
        relative
        w-full
        h-[calc(100dvh-145px)]
        min-h-[550px]
        max-h-[680px]
        overflow-hidden
        bg-[#b6315e]
      "
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt="CareNova Hospital"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Pink Overlay */}
      <div className="absolute inset-0 bg-[#b6315e]/85" />

      {/* Right Image Section */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b6315e] via-[#b6315e]/70 to-transparent z-10" />

        {slides.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-6">
        <div
          key={currentSlide}
          className="h-full flex items-center max-w-2xl hero-text"
        >
          <div className="w-full">
            {/* Small Heading */}
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="w-7 md:w-9 h-[2px] bg-white" />

              <span className="text-white text-[9px] sm:text-xs md:text-sm font-semibold tracking-[0.2em]">
                {slide.smallTitle}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.03] tracking-tight">
              {slide.title}

              <span className="block text-white/90 italic font-normal mt-1 md:mt-2">
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 md:mt-5 text-white/85 text-sm sm:text-base md:text-lg leading-6 md:leading-7 max-w-xl">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-5 md:mt-6">
              <button
                onClick={() => scrollToSection("book")}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  md:gap-3
                  bg-white
                  text-[#b6315e]
                  px-4
                  md:px-6
                  py-2.5
                  md:py-3
                  rounded-md
                  text-sm
                  md:text-base
                  font-semibold
                  hover:bg-[#10312C]
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                <CalendarDays size={16} />
                Book Appointment
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() => scrollToSection("doctors")}
                className="
                  flex
                  items-center
                  gap-2
                  text-white
                  border-b
                  border-white/70
                  pb-1
                  text-sm
                  md:text-base
                  font-medium
                  hover:border-white
                  transition
                "
              >
                Meet Our Doctors
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-5 md:mt-7 pt-4 md:pt-5 border-t border-white/25">
              {/* Emergency */}
              <div className="flex items-center gap-2 md:gap-3">
                <Clock3 size={17} className="text-white shrink-0" />

                <div>
                  <p className="text-white font-semibold text-xs md:text-sm">
                    24/7 Emergency
                  </p>

                  <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                    Always available
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-7 bg-white/25 hidden sm:block" />

              {/* Appointment */}
              <div className="flex items-center gap-2 md:gap-3">
                <Phone size={16} className="text-white shrink-0" />

                <div>
                  <p className="text-white font-semibold text-xs md:text-sm">
                    Easy Appointment
                  </p>

                  <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                    Quick & convenient
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-12 z-30 flex items-center gap-2 md:gap-4">
        {/* Previous */}
        <button
          onClick={previousSlide}
          className="
            w-8
            h-8
            md:w-9
            md:h-9
            border
            border-white/40
            text-white
            flex
            items-center
            justify-center
            hover:bg-white
            hover:text-[#b6315e]
            transition
          "
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[3px] transition-all duration-500 ${
                currentSlide === index
                  ? "w-7 md:w-9 bg-white"
                  : "w-3 md:w-4 bg-white/40"
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
            md:w-9
            md:h-9
            border
            border-white/40
            text-white
            flex
            items-center
            justify-center
            hover:bg-white
            hover:text-[#b6315e]
            transition
          "
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide Number */}
      <div className="absolute bottom-5 md:bottom-7 left-5 md:left-12 z-30 text-white/60 text-[9px] md:text-xs tracking-[0.2em]">
        0{currentSlide + 1} / 0{slides.length}
      </div>

      {/* Animation */}
      <style>
        {`
          .hero-text {
            animation: heroTextIn 0.7s ease-out;
          }

          @keyframes heroTextIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
