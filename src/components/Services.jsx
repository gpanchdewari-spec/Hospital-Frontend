import {
  HeartPulse,
  Brain,
  Stethoscope,
  Baby,
  Ambulance,
  Microscope,
} from "lucide-react";

const services = [
  {
    icon: <HeartPulse size={45} className="text-[#b6315e]" />,
    title: "Cardiology",
    description: "Advanced diagnosis and treatment for heart-related diseases.",
  },
  {
    icon: <Brain size={45} className="text-[#b6315e]" />,
    title: "Neurology",
    description:
      "Expert care for brain, spinal cord, and nervous system disorders.",
  },
  {
    icon: <Stethoscope size={45} className="text-[#b6315e]" />,
    title: "General Medicine",
    description: "Complete healthcare services with experienced physicians.",
  },
  {
    icon: <Baby size={45} className="text-[#b6315e]" />,
    title: "Pediatrics",
    description: "Comprehensive healthcare services for infants and children.",
  },
  {
    icon: <Microscope size={45} className="text-[#b6315e]" />,
    title: "Laboratory",
    description: "Modern diagnostic laboratory with accurate test results.",
  },
  {
    icon: <Ambulance size={45} className="text-[#b6315e]" />,
    title: "24/7 Emergency",
    description: "Emergency medical care available round the clock.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-[#f2f7f5] grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We provide world-class healthcare services with highly qualified
            doctors, advanced medical technology, and compassionate care.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-5">{service.icon}</div>

              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>

              <p className="text-gray-600 leading-7">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
