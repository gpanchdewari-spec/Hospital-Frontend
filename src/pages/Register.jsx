import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", formData);

      toast.success(data.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#F0D9DF] bg-[#FDFAFB] rounded-lg p-3 text-[#241019] placeholder:text-[#BB93A0] outline-none transition focus:border-[#B6315E] focus:ring-4 focus:ring-[#B6315E]/10 hover:border-[#B6315E]/40";

  return (
    <div className="min-h-screen flex items-stretch bg-[#FBF2F4]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[42%] relative bg-gradient-to-br from-[#7A1F3E] to-[#B6315E] text-white flex-col justify-between p-12 overflow-hidden">
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-sm tracking-[0.2em] uppercase text-[#F3C4D1]">
              CareNova Hospital
            </span>
          </div>

          <h1
            className="mt-10 text-4xl xl:text-[2.75rem] font-semibold leading-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Your care,
            <br />
            on record.
          </h1>
          <p className="mt-4 text-[#F0C9D4] max-w-sm text-[15px] leading-relaxed">
            Create your patient profile once — appointments, prescriptions, and
            records stay with you across every visit.
          </p>
        </div>

        {/* Signature element: animated EKG pulse */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 400 80"
            className="w-full h-16 text-blue-400"
            fill="none"
          >
            <path
              d="M0 40 H120 L140 10 L160 70 L180 40 H400"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animation: "pulseDraw 2.4s ease-in-out infinite" }}
            />
          </svg>
          <p className="text-xs text-[#E7A9BB] mt-3 tracking-wide">
            One profile, every department
          </p>
        </div>

        <style>{`
          @keyframes pulseDraw {
            0% { stroke-dashoffset: 600; }
            60% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -600; }
          }
        `}</style>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[480px] py-6">
          {/* Mobile-only brand mark */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="w-2 h-2 rounded-full bg-[#B6315E]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#B6315E] font-medium">
              SmartCare Hospital
            </span>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(182,49,94,0.22)] border border-[#F3E1E6]">
            <h2 className="text-2xl font-semibold text-[#241019] text-center">
              Create your account
            </h2>
            <p className="text-sm text-[#8A5B68] text-center mt-1.5 mb-8">
              A few details so our care team can look after you properly
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-[#241019] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#241019] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#241019] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Age + Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-xs font-medium text-[#241019] mb-1.5"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-xs font-medium text-[#241019] mb-1.5"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClass + " appearance-none"}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Blood Group + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="bloodGroup"
                    className="block text-xs font-medium text-[#241019] mb-1.5"
                  >
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={inputClass + " appearance-none"}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium text-[#241019] mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-xs font-medium text-[#241019] mb-1.5"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={inputClass + " resize-none"}
                  required
                />
              </div>

              {/* Register */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B6315E] text-white py-3 rounded-lg font-medium tracking-wide transition hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#B6315E]/25"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm text-[#8A5B68] mt-7">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#B6315E] font-semibold hover:text-blue-600 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
