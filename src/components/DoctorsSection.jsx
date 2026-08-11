import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
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

  return (
    <section id="doctors" className="bg-[#f3f7f6] grid-bg py-24 px-6 md:px-16 lg:px-20">
      {/* Section header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <p className="doc-sans text-xs tracking-[0.25em] uppercase text-[#da2990] font-medium mb-3">
          Verified Practitioners
        </p>
        <h1 className="doc-serif text-5xl md:text-6xl text-[#10312C] font-medium">
          Our Doctors
        </h1>
        <p className="doc-sans text-[#10312C]/60 mt-4 text-sm md:text-base">
          A curated panel of specialists, credentialed and ready to see you.
        </p>
      </div>

      {/* Loading skeleton */}
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

      {/* Empty state */}
      {!loading && doctors.length === 0 && (
        <p className="doc-sans text-center text-[#10312C]/50">
          No doctors are listed right now. Check back shortly.
        </p>
      )}

      {/* Doctor grid */}
      {!loading && doctors.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="doc-card bg-white rounded-[7px] p-5 pb-6 border-1 border-[#10312C]/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(16,49,44,0.15)]"
            >
              {/* Avatar with seal ring + status dot */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="seal-ring w-full h-full rounded-full">
                  <img
                    src={doctor.profileImage || "/doctor-placeholder.png"}
                    alt={doctor.userId?.name || "Doctor"}
                    className="w-full h-full rounded-full object-cover bg-[#FBF8F3]"
                  />
                </div>
                <span className="pulse absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#4C9A76] border-2 border-white" />
              </div>

              {/* Name + specialization */}
              <h2 className="doc-serif text-xl text-[#10312C] text-center font-medium leading-snug">
                {doctor.userId?.name}
              </h2>

              <div className="flex justify-center mt-2 mb-4">
                <span className="doc-sans text-[11px] tracking-wide uppercase font-medium text-[#B8863B] bg-[#B8863B]/[0.08] px-3 py-1 rounded-full">
                  {doctor.specialization}
                </span>
              </div>

              <p className="doc-sans text-center text-sm text-[#10312C]/70">
                {doctor.qualification}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#10312C]/[0.07] my-4" />

              {/* Stat strip */}
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

              <Link to={`/patient/book-appointment?doctorId=${doctor._id}`}>
                <button className="doc-sans w-full bg-[#b6315e] cursor-pointer text-white text-sm font-medium py-3 rounded-[5px] hover:bg-blue-600 transition-colors duration-300">
                  Book Appointment
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsSection;
