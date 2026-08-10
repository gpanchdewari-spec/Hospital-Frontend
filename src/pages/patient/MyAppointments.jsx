import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments/my");

      setAppointments(data.appointments || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to load appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Status styling
  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Completed") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="w-full min-w-0">
      {/* ================= HEADER ================= */}

      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Appointments
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-2">
              View and track all your appointments.
            </p>
          </div>

          <Link
            to="/patient/book-appointment"
            className="bg-blue-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base text-center"
          >
            + Book Appointment
          </Link>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="w-full min-w-0 bg-white rounded-xl shadow-sm sm:shadow-md p-3 sm:p-6">
        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-sm sm:text-base">
              Loading appointments...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          /* ================= EMPTY ================= */

          <div className="text-center py-10 sm:py-12">
            <div className="text-4xl sm:text-5xl mb-4">📅</div>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              No Appointments Found
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              You haven't booked any appointments yet.
            </p>

            <Link
              to="/patient/book-appointment"
              className="inline-block bg-blue-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <>
            {/* ================================================= */}
            {/* MOBILE APPOINTMENT CARDS */}
            {/* ================================================= */}

            <div className="block md:hidden space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  {/* ================= DOCTOR + STATUS ================= */}

                  <div className="flex justify-between items-start gap-3">
                    {/* Doctor */}

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Doctor</p>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base whitespace-normal">
                        Dr. {appointment.doctorId?.userId?.name || "Doctor"}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.doctorId?.specialization ||
                          "Medical Specialist"}
                      </p>
                    </div>

                    {/* Status */}

                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {/* Date */}

                    <div>
                      <p className="text-xs text-gray-500">Date</p>

                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {new Date(
                          appointment.appointmentDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Time */}

                    <div>
                      <p className="text-xs text-gray-500">Time</p>

                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {appointment.appointmentTime}
                      </p>
                    </div>
                  </div>

                  {/* ================= REASON ================= */}

                  <div className="mt-4">
                    <p className="text-xs text-gray-500">Reason</p>

                    <p className="text-sm text-gray-700 mt-1 break-words">
                      {appointment.reason || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ================================================= */}
            {/* DESKTOP TABLE */}
            {/* ================================================= */}

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                {/* ================= TABLE HEADER ================= */}

                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Doctor
                    </th>

                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Specialization
                    </th>

                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>

                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Time
                    </th>

                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Reason
                    </th>

                    <th className="p-3 sm:p-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Doctor */}

                      <td className="p-3 sm:p-4 font-semibold text-sm text-gray-800 whitespace-nowrap">
                        Dr. {appointment.doctorId?.userId?.name || "Doctor"}
                      </td>

                      {/* Specialization */}

                      <td className="p-3 sm:p-4 text-sm text-gray-600">
                        {appointment.doctorId?.specialization || "N/A"}
                      </td>

                      {/* Date */}

                      <td className="p-3 sm:p-4 text-sm whitespace-nowrap">
                        {new Date(
                          appointment.appointmentDate,
                        ).toLocaleDateString()}
                      </td>

                      {/* Time */}

                      <td className="p-3 sm:p-4 text-sm whitespace-nowrap">
                        {appointment.appointmentTime}
                      </td>

                      {/* Reason */}

                      <td className="p-3 sm:p-4 text-sm text-gray-600 max-w-[220px]">
                        <p className="truncate">
                          {appointment.reason || "N/A"}
                        </p>
                      </td>

                      {/* Status */}

                      <td className="p-3 sm:p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusClass(
                            appointment.status,
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
