import { useState, useContext } from "react";
import {
  HeartPulse,
  Brain,
  Stethoscope,
  Baby,
  Ambulance,
  Microscope,
  Bone,
  ScanLine,
  Sparkles,
  ArrowRight,
  VenusAndMars,
  Users,
  BadgeCheck,
  Clock3,
  X,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const services = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    description:
      "Advanced diagnosis, prevention, and treatment for heart and cardiovascular conditions.",
    details:
      "Our Cardiology services focus on comprehensive heart and cardiovascular care. We provide evaluation, prevention, and management of common heart-related conditions with a patient-focused approach.",
    treatments: [
      "Heart health evaluation",
      "Cardiovascular disease management",
      "Blood pressure management",
      "Heart disease prevention",
      "Routine cardiac consultation",
    ],
  },

  {
    icon: Brain,
    title: "Neurology",
    description:
      "Specialized care for disorders affecting the brain, spinal cord, and nervous system.",
    details:
      "Our Neurology services provide specialized consultation and care for conditions affecting the brain, nerves, spinal cord, and nervous system.",
    treatments: [
      "Neurological evaluation",
      "Headache and migraine care",
      "Nerve disorder management",
      "Neurological consultations",
      "Nervous system health assessment",
    ],
  },

  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Comprehensive medical care for common illnesses, health concerns, and preventive care.",
    details:
      "General Medicine provides comprehensive healthcare for everyday health concerns, common illnesses, preventive care, and ongoing medical conditions.",
    treatments: [
      "General health checkups",
      "Common illness treatment",
      "Preventive healthcare",
      "Routine medical consultation",
      "Chronic condition management",
    ],
  },

  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Specialized healthcare focused on the growth, development, and wellbeing of children.",
    details:
      "Our Pediatrics services are focused on providing compassionate healthcare for infants, children, and teenagers while supporting healthy growth and development.",
    treatments: [
      "Child health checkups",
      "Growth and development monitoring",
      "Childhood illness care",
      "Nutritional guidance",
      "Pediatric consultations",
    ],
  },

  {
    icon: Bone,
    title: "Orthopedics",
    description:
      "Expert treatment for bones, joints, muscles, sports injuries, and orthopedic conditions.",
    details:
      "Our Orthopedics department provides consultation and treatment for conditions involving bones, joints, muscles, ligaments, and sports-related injuries.",
    treatments: [
      "Bone and joint consultation",
      "Sports injury care",
      "Joint pain management",
      "Musculoskeletal evaluation",
      "Orthopedic consultations",
    ],
  },

  {
    icon: VenusAndMars,
    title: "Gynecology & Obstetrics",
    description:
      "Complete women's healthcare including pregnancy, maternity, and reproductive care.",
    details:
      "Our Gynecology & Obstetrics services provide comprehensive women's healthcare covering reproductive health, pregnancy, maternity care, and routine consultations.",
    treatments: [
      "Women's health checkups",
      "Pregnancy consultation",
      "Maternity care",
      "Reproductive health consultation",
      "Gynecological evaluation",
    ],
  },

  {
    icon: Sparkles,
    title: "Dermatology",
    description:
      "Professional diagnosis and treatment for skin, hair, and nail-related conditions.",
    details:
      "Our Dermatology services focus on the diagnosis and management of common skin, hair, and nail conditions with personalized treatment recommendations.",
    treatments: [
      "Skin health consultation",
      "Acne and skin condition care",
      "Hair and scalp consultation",
      "Nail-related condition care",
      "General dermatology consultation",
    ],
  },

  {
    icon: ScanLine,
    title: "Radiology & Imaging",
    description:
      "Modern diagnostic imaging services supporting accurate and timely medical diagnosis.",
    details:
      "Radiology & Imaging supports healthcare professionals with diagnostic imaging services that help in evaluating and understanding different medical conditions.",
    treatments: [
      "Diagnostic imaging",
      "Medical imaging consultation",
      "Imaging-based evaluation",
      "Diagnostic support",
      "Radiology services",
    ],
  },

  {
    icon: Microscope,
    title: "Laboratory",
    description:
      "Reliable laboratory testing with accurate results to support effective medical care.",
    details:
      "Our Laboratory services provide diagnostic testing that supports doctors in evaluating health conditions and making informed treatment decisions.",
    treatments: [
      "Routine laboratory testing",
      "Diagnostic blood testing",
      "Health screening tests",
      "Medical test reports",
      "Diagnostic laboratory support",
    ],
  },

  {
    icon: Ambulance,
    title: "24/7 Emergency",
    description:
      "Round-the-clock emergency medical services for urgent and critical healthcare needs.",
    details:
      "Our Emergency Care service is designed to provide medical assistance for urgent healthcare situations with support available around the clock.",
    treatments: [
      "24/7 emergency assistance",
      "Urgent medical evaluation",
      "Emergency consultation",
      "Immediate medical support",
      "Critical care coordination",
    ],
  },
];

const stats = [
  {
    icon: Users,
    text: "10,000+ Patients Served",
  },
  {
    icon: Stethoscope,
    text: "50+ Medical Professionals",
  },
  {
    icon: Clock3,
    text: "24/7 Emergency Care",
  },
  {
    icon: BadgeCheck,
    text: "Trusted Healthcare",
  },
  {
    icon: HeartPulse,
    text: "Patient-Centered Care",
  },
  {
    icon: Microscope,
    text: "Modern Diagnostic Services",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate();

  // Get logged-in user from AuthContext
  const { user } = useContext(AuthContext);

  // ==========================================
  // BOOK APPOINTMENT
  // ==========================================
  const handleBookAppointment = () => {
    // Close modal first
    setSelectedService(null);

    if (user) {
      // User is logged in
      navigate("/patient/book-appointment");
    } else {
      // User is not logged in
      navigate("/login");
    }
  };

  const handleLearnMore = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section
        id="services"
        className="relative overflow-hidden bg-[#f2f7f5] py-20 md:py-24"
      >
        {/* ================================
            DECORATIVE BACKGROUND
        ================================= */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#b6315e]/[0.04] blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#10312C]/[0.04] blur-3xl" />

        <div className="relative">
          {/* ================================
              CONTINUOUS HEALTHCARE TICKER
          ================================= */}
          <div className="relative w-full overflow-hidden bg-[#b6315e] mb-16 shadow-sm">
            <div className="stats-track flex w-max">
              {/* FIRST SET */}
              <div className="flex items-center shrink-0">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div key={`first-${index}`} className="flex items-center">
                      <div className="flex items-center gap-3 px-8 md:px-12 py-5">
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="text-white shrink-0"
                        />

                        <span className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                          {stat.text}
                        </span>
                      </div>

                      <span className="text-white/40 text-lg">•</span>
                    </div>
                  );
                })}
              </div>

              {/* DUPLICATE SET */}
              <div className="flex items-center shrink-0">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div key={`second-${index}`} className="flex items-center">
                      <div className="flex items-center gap-3 px-8 md:px-12 py-5">
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="text-white shrink-0"
                        />

                        <span className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
                          {stat.text}
                        </span>
                      </div>

                      <span className="text-white/40 text-lg">•</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================================
              SECTION HEADER
          ================================= */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="flex justify-center items-center gap-3 mb-4">
                <span className="w-9 h-px bg-[#b6315e]" />

                <span className="text-[#b6315e] text-xs font-semibold tracking-[0.25em] uppercase">
                  Healthcare Excellence
                </span>

                <span className="w-9 h-px bg-[#b6315e]" />
              </div>

              <h2 className="text-4xl md:text-5xl font-semibold text-[#10312C]">
                Our Medical Services
              </h2>

              <p className="text-[#10312C]/60 mt-5 text-sm md:text-base leading-7">
                Comprehensive medical services delivered by experienced
                professionals with modern technology and compassionate care.
              </p>
            </div>

            {/* ================================
                SERVICES GRID
            ================================= */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="
                      group
                      relative
                      bg-white
                      rounded-2xl
                      border
                      border-[#10312C]/[0.06]
                      p-7
                      md:p-8
                      shadow-[0_8px_30px_rgba(16,49,44,0.05)]
                      hover:-translate-y-2
                      hover:shadow-[0_20px_45px_rgba(16,49,44,0.12)]
                      transition-all
                      duration-500
                      overflow-hidden
                    "
                  >
                    {/* Top Pink Line */}
                    <div
                      className="
                        absolute
                        top-0
                        left-0
                        right-0
                        h-1
                        bg-[#b6315e]
                        scale-x-0
                        group-hover:scale-x-100
                        origin-left
                        transition-transform
                        duration-500
                      "
                    />

                    {/* Number */}
                    <span
                      className="
                        absolute
                        top-6
                        right-7
                        text-xs
                        font-semibold
                        tracking-widest
                        text-[#10312C]/15
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-[#b6315e]/[0.08]
                        flex
                        items-center
                        justify-center
                        mb-6
                        group-hover:bg-[#b6315e]
                        transition-all
                        duration-500
                      "
                    >
                      <Icon
                        size={31}
                        strokeWidth={1.7}
                        className="
                          text-[#b6315e]
                          group-hover:text-white
                          transition-colors
                          duration-500
                        "
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#10312C] mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#10312C]/60 text-sm leading-7">
                      {service.description}
                    </p>

                    {/* Bottom */}
                    <button
                      onClick={() => handleLearnMore(service)}
                      className="
                        mt-6
                        pt-5
                        border-t
                        border-[#10312C]/[0.07]
                        flex
                        items-center
                        justify-between
                        w-full
                        text-left
                        cursor-pointer
                      "
                    >
                      <span className="text-[#b6315e] text-sm font-semibold">
                        Learn More
                      </span>

                      <div
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-[#b6315e]/[0.08]
                          flex
                          items-center
                          justify-center
                          group-hover:bg-[#b6315e]
                          transition-all
                          duration-300
                        "
                      >
                        <ArrowRight
                          size={15}
                          className="
                            text-[#b6315e]
                            group-hover:text-white
                            group-hover:translate-x-0.5
                            transition-all
                            duration-300
                          "
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ================================
                BOTTOM CTA
            ================================= */}
            <div
              className="
                mt-16
                rounded-2xl
                bg-white
                border
                border-[#10312C]/[0.06]
                px-6
                py-8
                md:px-10
                flex
                flex-col
                md:flex-row
                items-center
                justify-between
                gap-6
                shadow-[0_8px_30px_rgba(16,49,44,0.05)]
              "
            >
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-[#10312C]">
                  Not sure which service you need?
                </h3>

                <p className="text-[#10312C]/55 text-sm mt-2">
                  Our healthcare team can help you find the right care.
                </p>
              </div>

              {/* BOOK APPOINTMENT BUTTON */}
              <button
                onClick={handleBookAppointment}
                className="
                  shrink-0
                  inline-flex
                  items-center
                  gap-2
                  bg-[#b6315e]
                  text-white
                  px-7
                  py-3.5
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:bg-[#9f2851]
                  hover:-translate-y-0.5
                  shadow-lg
                  shadow-[#b6315e]/20
                  transition-all
                  duration-300
                "
              >
                Book Appointment
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* ================================
            CONTINUOUS TICKER ANIMATION
        ================================= */}
        <style>
          {`
            .stats-track {
              animation: statsTicker 30s linear infinite;
              will-change: transform;
            }

            .stats-track:hover {
              animation-play-state: paused;
            }

            @keyframes statsTicker {
              from {
                transform: translateX(0);
              }

              to {
                transform: translateX(-50%);
              }
            }

            @media (max-width: 640px) {
              .stats-track {
                animation-duration: 22s;
              }
            }
          `}
        </style>
      </section>

      {/* =================================================
          SERVICE DETAILS MODAL
      ================================================= */}
      {selectedService && (
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
            py-6
            service-modal-overlay
          "
          onClick={closeModal}
        >
          <div
            className="
              relative
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
              service-modal
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-[#b6315e] text-white px-6 sm:px-8 py-7">
              <button
                onClick={closeModal}
                className="
                  absolute
                  top-4
                  right-4
                  w-9
                  h-9
                  rounded-full
                  bg-white/15
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-[#b6315e]
                  transition
                "
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <selectedService.icon size={28} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-white/70 text-[10px] font-semibold tracking-[0.2em] uppercase">
                    Medical Service
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
                    {selectedService.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 sm:px-8 py-7">
              <p className="text-[#10312C]/70 text-sm md:text-base leading-7">
                {selectedService.details}
              </p>

              {/* Services Included */}
              <div className="mt-7">
                <h3 className="text-lg font-semibold text-[#10312C]">
                  Our Services Include
                </h3>

                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {selectedService.treatments.map((treatment) => (
                    <div
                      key={treatment}
                      className="
                        flex
                        items-center
                        gap-3
                        bg-[#f2f7f5]
                        rounded-lg
                        px-4
                        py-3
                      "
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#b6315e] shrink-0"
                      />

                      <span className="text-sm text-[#10312C]/75">
                        {treatment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div
                className="
                  mt-7
                  pt-6
                  border-t
                  border-[#10312C]/[0.08]
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-[#10312C]">
                    Need this service?
                  </p>

                  <p className="text-xs text-[#10312C]/50 mt-1">
                    Schedule a consultation with our medical team.
                  </p>
                </div>

                {/* BOOK APPOINTMENT BUTTON */}
                <button
                  onClick={handleBookAppointment}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#b6315e]
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    text-sm
                    font-semibold
                    hover:bg-[#10312C]
                    transition-all
                    duration-300
                    shrink-0
                  "
                >
                  <CalendarDays size={17} />
                  Book Appointment
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          <style>
            {`
              .service-modal-overlay {
                animation: serviceOverlayIn 0.25s ease-out;
              }

              .service-modal {
                animation: serviceModalIn 0.3s ease-out;
              }

              @keyframes serviceOverlayIn {
                from {
                  opacity: 0;
                }

                to {
                  opacity: 1;
                }
              }

              @keyframes serviceModalIn {
                from {
                  opacity: 0;
                  transform: translateY(15px) scale(0.97);
                }

                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};

export default Services;
