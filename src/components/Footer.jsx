import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              CareNova Hospital
            </h2>

            <p className="leading-7 text-gray-400">
              CareNova Hospital is committed to providing quality healthcare
              with experienced doctors, advanced medical technology, and
              compassionate patient care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <a href="#services" className="hover:text-blue-400">
                  Services
                </a>
              </li>

              <li>
                <a href="#doctors" className="hover:text-blue-400">
                  Doctors
                </a>
              </li>

              <li>
                <Link to="/login" className="hover:text-blue-400">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-blue-400">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Services</h3>

            <ul className="space-y-3">
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Pediatrics</li>
              <li>Orthopedics</li>
              <li>Emergency Care</li>
              <li>General Medicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-3">
              <p>
                <strong>Phone:</strong> +91 9876543210
              </p>

              <p>
                <strong>Email:</strong> smartcare@gmail.com
              </p>

              <p>
                <strong>Address:</strong> Kanpur, Uttar Pradesh, India
              </p>

              <p>
                <strong>Working Hours:</strong>
                <br />
                Mon - Sat : 9:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} CareNova Hospital. All Rights
            Reserved.
          </p>

          <p className="mt-2 text-sm">
            Designed & Developed by{" "}
            <span className="text-white font-semibold">Govind Thakur</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
