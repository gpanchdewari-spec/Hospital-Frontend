import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchAppointments = async () => {
  try {
    const { data } = await api.get("/appointments/my");

    setAppointments(data.appointments || []);
  } catch (error) {
    console.log(error);

    toast.error(error.response?.data?.message || "Unable to load appointments");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAppointments();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) >= today,
  );

  const totalAmount = appointments.reduce(
    (total, appointment) => total + (appointment.consultationFee || 0),
    0,
  );

  const paidAmount = appointments.reduce(
    (total, appointment) =>
      appointment.paymentStatus === "Paid"
        ? total + (appointment.consultationFee || 0)
        : total,
    0,
  );

  return (
    <>
      <div className="min-h-screen bg-slate-100 px-2 py-4 sm:px-6 sm:py-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* ================= WELCOME CARD ================= */}

          <div className="bg-blue-600 text-white rounded-xl shadow-md p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome to CareNova Hospital 👋
            </h1>

            <p className="mt-3 text-sm sm:text-lg text-blue-100 leading-6">
              Manage your appointments, view doctors, and access your healthcare
              information from one place.
            </p>
          </div>

          {/* ================= STATISTICS ================= */}
          <div className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-8">
            {/* Total Appointments */}

            <div className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm">
                Total Appointments
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
                {appointments.length}
              </h2>
            </div>

            {/* Upcoming */}

            <div className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm">
                Upcoming Appointments
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
                {upcomingAppointments.length}
              </h2>
            </div>

            {/* Doctors */}

            <div className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm">
                Available Doctors
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mt-2">
                20+
              </h2>
            </div>

            {/* Total Amount */}

            <div className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm">
                Total Amount's Appointment
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2 break-words">
                ₹{totalAmount}
              </h2>
            </div>

            {/* Paid Amount */}

            <div className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm">
                Paid Amount of Appointment
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mt-2 break-words">
                ₹{paidAmount}
              </h2>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-7 sm:mt-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Link
                to="/patient/book-appointment"
                className="bg-blue-600 text-white p-5 sm:p-6 rounded-xl hover:bg-blue-700 transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  📅 Book Appointment
                </h3>

                <p className="mt-2 text-sm sm:text-base text-blue-100 leading-6">
                  Schedule a new appointment with a doctor.
                </p>
              </Link>

              <Link
                to="/patient/my-appointments"
                className="bg-green-600 text-white p-5 sm:p-6 rounded-xl hover:bg-green-700 transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  📋 My Appointments
                </h3>

                <p className="mt-2 text-sm sm:text-base text-green-100 leading-6">
                  View all your booked appointments.
                </p>
              </Link>

              <Link
                to="/"
                className="bg-purple-600 text-white p-5 sm:p-6 rounded-xl hover:bg-purple-700 transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold">👨‍⚕️ Doctors</h3>

                <p className="mt-2 text-sm sm:text-base text-purple-100 leading-6">
                  Browse available doctors and their specializations.
                </p>
              </Link>
            </div>
          </div>

          {/* ================= RECENT APPOINTMENTS ================= */}

          <div className="bg-white shadow-sm sm:shadow-md rounded-xl mt-7 sm:mt-10 p-3 sm:p-6">
            {/* Heading */}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Recent Appointments
              </h2>

              <Link
                to="/patient/my-appointments"
                className="text-blue-600 font-semibold hover:underline text-sm sm:text-base"
              >
                View All
              </Link>
            </div>

            {/* Loading */}

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-sm sm:text-base">
                  Loading appointments...
                </p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-sm sm:text-base">
                  No appointments booked yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm"
                  >
                    {/* Mobile / Desktop Appointment */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Doctor */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>

                        <h3 className="font-semibold text-base sm:text-lg truncate">
                          Dr. {appointment.doctorId?.userId?.name || "Doctor"}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {appointment.doctorId?.specialization ||
                            "Medical Specialist"}
                        </p>
                      </div>

                      {/* Date */}

                      <div>
                        <p className="text-xs text-gray-500">Date</p>

                        <p className="font-medium text-sm sm:text-base">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Time */}

                      <div>
                        <p className="text-xs text-gray-500">Time</p>

                        <p className="font-medium text-sm sm:text-base">
                          {appointment.appointmentTime}
                        </p>
                      </div>

                      {/* Status */}

                      <div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                            appointment.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : appointment.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : appointment.status === "Completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
