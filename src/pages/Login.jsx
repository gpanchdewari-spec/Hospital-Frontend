import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const { data } = await api.post("/auth/login", formData);

      login(data.user, data.token);

      toast.success("Login Successful");

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[#EAF6F4]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#b6315e] to-[#b6315e] text-white flex-col justify-between p-12 overflow-hidden">
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B5D]" />
            <span className="text-sm tracking-[0.2em] uppercase text-[#9FD8D2]">
              CareNova Hospital
            </span>
          </div>

          <h1
            className="mt-10 text-4xl xl:text-5xl font-semibold leading-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Care, coordinated.
            <br />
            Access, simplified.
          </h1>
          <p className="mt-4 text-[#B9E3DE] max-w-sm text-[15px] leading-relaxed">
            One secure sign-in for patients, doctors, and staff across every
            CareNova department.
          </p>
        </div>

        {/* Signature element: animated EKG pulse */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 400 80"
            className="w-full h-16 text-[#FF6B5D]"
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
              style={{
                animation: "pulseDraw 2.4s ease-in-out infinite",
              }}
            />
          </svg>
          <p className="text-xs text-[#7FBEB7] mt-3 tracking-wide">
            Trusted by 40+ care teams nationwide
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
        <div className="w-full max-w-[400px]">
          {/* Mobile-only brand mark */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="w-2 h-2 rounded-full bg-[#FF6B5D]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#0B4F4A] font-medium">
              CareNova Hospital
            </span>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(11,79,74,0.25)] border border-[#E4F2EF]">
            <h2 className="text-2xl font-semibold text-[#0F2A28] text-center">
              Welcome back
            </h2>
            <p className="text-sm text-[#5B7B77] text-center mt-1.5 mb-8">
              Sign in to your CareNova account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#0F2A28] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#D7E9E6] bg-[#FAFDFD] px-4 py-3 rounded-lg text-[#0F2A28] placeholder:text-[#9FB6B2] outline-none transition focus:border-[#0B4F4A] focus:ring-4 focus:ring-[#0B4F4A]/10"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#0F2A28] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-[#D7E9E6] bg-[#FAFDFD] px-4 py-3 rounded-lg text-[#0F2A28] placeholder:text-[#9FB6B2] outline-none transition focus:border-[#0B4F4A] focus:ring-4 focus:ring-[#0B4F4A]/10"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#b6315e] text-white py-3 rounded-lg font-medium tracking-wide transition hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#0B4F4A]/25"
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-[#5B7B77] mt-7">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#0B4F4A] font-medium hover:text-[#FF6B5D] transition"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
