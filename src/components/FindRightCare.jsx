import { useState } from "react";
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Sparkles,
  Stethoscope,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const careOptions = [
  {
    id: "heart",
    icon: HeartPulse,
    title: "Heart Care",
    service: "Cardiology",
    description:
      "Expert diagnosis, prevention, and treatment for heart and cardiovascular conditions.",
  },
  {
    id: "brain",
    icon: Brain,
    title: "Brain & Nerve",
    service: "Neurology",
    description:
      "Specialized care for conditions affecting the brain, spinal cord, and nervous system.",
  },
  {
    id: "bones",
    icon: Bone,
    title: "Bone & Joint",
    service: "Orthopedics",
    description:
      "Professional treatment for bones, joints, muscles, injuries, and orthopedic conditions.",
  },
  {
    id: "child",
    icon: Baby,
    title: "Child Care",
    service: "Pediatrics",
    description:
      "Dedicated healthcare for children's growth, development, and overall wellbeing.",
  },
  {
    id: "skin",
    icon: Sparkles,
    title: "Skin Care",
    service: "Dermatology",
    description:
      "Diagnosis and treatment for skin, hair, and nail-related health concerns.",
  },
  {
    id: "general",
    icon: Stethoscope,
    title: "General Care",
    service: "General Medicine",
    description:
      "Comprehensive medical care for common illnesses, health concerns, and preventive care.",
  },
];

const FindRightCare = () => {
  const [selected, setSelected] = useState(careOptions[0]);
  const navigate = useNavigate();

  const Icon = selected.icon;

  const handleExplore = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleAppointment = () => {
    navigate("/patient/book-appointment");
  };

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b6315e]/[0.04]" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#10312C]/[0.04]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#b6315e]" />

            <span className="text-[#b6315e] text-[11px] font-semibold tracking-[0.22em] uppercase">
              Personalized Care
            </span>

            <span className="w-8 h-px bg-[#b6315e]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#10312C]">
            Find the Right Care
          </h2>

          <p className="text-[#10312C]/55 text-sm md:text-base leading-7 mt-4">
            Tell us what kind of care you are looking for and discover the right
            medical service for your needs.
          </p>
        </div>

        {/* Care Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
          {careOptions.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = selected.id === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelected(option)}
                className={`
                  group relative rounded-xl p-4 md:p-5
                  border transition-all duration-300
                  text-center
                  ${
                    isSelected
                      ? "bg-[#b6315e] border-[#b6315e] text-white shadow-lg shadow-[#b6315e]/20 -translate-y-1"
                      : "bg-[#f2f7f5] border-[#10312C]/[0.06] text-[#10312C] hover:border-[#b6315e]/30 hover:-translate-y-1 hover:shadow-md"
                  }
                `}
              >
                <div
                  className={`
                    mx-auto w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                    ${
                      isSelected
                        ? "bg-white/15"
                        : "bg-white group-hover:bg-[#b6315e]/10"
                    }
                  `}
                >
                  <OptionIcon
                    size={22}
                    strokeWidth={1.8}
                    className={isSelected ? "text-white" : "text-[#b6315e]"}
                  />
                </div>

                <span
                  className={`text-xs md:text-sm font-semibold ${
                    isSelected ? "text-white" : "text-[#10312C]"
                  }`}
                >
                  {option.title}
                </span>

                {/* Selected indicator */}
                {isSelected && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Result Card */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div
            key={selected.id}
            className="care-result bg-[#f2f7f5] rounded-2xl border border-[#10312C]/[0.06] p-6 md:p-8 shadow-[0_12px_35px_rgba(16,49,44,0.06)]"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#b6315e] flex items-center justify-center shrink-0">
                <Icon size={30} strokeWidth={1.7} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-[#b6315e] text-xs font-semibold tracking-wider uppercase mb-1">
                  Recommended Care
                </p>

                <h3 className="text-2xl md:text-3xl font-semibold text-[#10312C]">
                  {selected.service}
                </h3>

                <p className="text-[#10312C]/60 text-sm leading-6 mt-2 max-w-2xl">
                  {selected.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
                <button
                  onClick={handleExplore}
                  className="group inline-flex items-center justify-center gap-2 border border-[#10312C]/15 bg-white text-[#10312C] px-5 py-3 rounded-lg text-sm font-semibold hover:border-[#b6315e] hover:text-[#b6315e] transition-all duration-300"
                >
                  Explore Service
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={handleAppointment}
                  className="group inline-flex items-center justify-center gap-2 bg-[#b6315e] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#10312C] transition-all duration-300"
                >
                  <CalendarDays size={16} />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b6315e]" />
          <p className="text-xs text-[#10312C]/40">
            Select a care category to explore your options
          </p>
        </div>
      </div>

      <style>
        {`
          .care-result {
            animation: careResultIn 0.35s ease-out;
          }

          @keyframes careResultIn {
            from {
              opacity: 0;
              transform: translateY(10px);
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

export default FindRightCare;
