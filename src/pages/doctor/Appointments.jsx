import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH APPOINTMENTS =================

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get("/appointments");

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

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, {
        status,
      });

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to update appointment",
      );
    }
  };

  // ================= UPDATE PAYMENT =================

  const updatePaymentStatus = async (id) => {
    try {
      await api.put(`/appointments/${id}/payment`, {
        paymentStatus: "Paid",
      });

      toast.success("Payment marked as Paid");

      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to update payment");
    }
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen w-full min-w-0 bg-slate-100 px-2 py-4 sm:px-4 md:px-6 sm:py-6">
      <div className="w-full max-w-7xl mx-auto min-w-0">
        {/* ================= HEADER ================= */}

        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Appointments
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Manage appointments assigned to you.
          </p>
        </div>

        {/* ================= APPOINTMENTS CONTAINER ================= */}

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
                No Appointments
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                You currently have no appointments.
              </p>
            </div>
          ) : (
            <>
              {/* ================================================= */}
              {/* MOBILE / TABLET CARDS */}
              {/* BELOW 1024px */}
              {/* ================================================= */}

              <div className="block lg:hidden w-full min-w-0 space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="w-full max-w-full min-w-0 overflow-hidden border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    {/* ================= PATIENT + STATUS ================= */}

                    <div className="flex items-start justify-between gap-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Patient</p>

                        <h3 className="font-semibold text-gray-800 text-[10px] whitespace-normal break-normal">
                          {appointment.patientId?.userId?.name || "Patient"}
                        </h3>
                      </div>

                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    {/* ================= PATIENT DETAILS ================= */}

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {/* Age */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Age</p>

                        <p className="text-sm font-medium text-gray-800">
                          {appointment.patientId?.age || "N/A"}
                        </p>
                      </div>

                      {/* Gender */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Gender</p>

                        <p className="text-sm font-medium text-gray-800">
                          {appointment.patientId?.gender || "N/A"}
                        </p>
                      </div>

                      {/* Phone */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Phone</p>

                        <p className="text-sm font-medium text-gray-800 break-all">
                          {appointment.patientId?.phone || "N/A"}
                        </p>
                      </div>

                      {/* Date */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Date</p>

                        <p className="text-sm font-medium text-gray-800">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Time */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Time</p>

                        <p className="text-sm font-medium text-gray-800 break-words">
                          {appointment.appointmentTime}
                        </p>
                      </div>

                      {/* Fee */}

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Fee</p>

                        <p className="text-sm font-semibold text-gray-800">
                          ₹{appointment.consultationFee}
                        </p>
                      </div>
                    </div>

                    {/* ================= REASON ================= */}

                    <div className="mt-4 min-w-0">
                      <p className="text-xs text-gray-500">Reason</p>

                      <p className="text-sm text-gray-700 break-words">
                        {appointment.reason || "N/A"}
                      </p>
                    </div>

                    {/* ================= PAYMENT ================= */}

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs text-gray-500">Payment</span>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          appointment.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.paymentStatus || "Pending"}
                      </span>
                    </div>

                    {/* ================= ACTIONS ================= */}

                    <div className="mt-4 w-full min-w-0">
                      {/* Pending */}

                      {appointment.status === "Pending" && (
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Approved")
                            }
                            className="w-full min-w-0 bg-green-600 text-white px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Rejected")
                            }
                            className="w-full min-w-0 bg-red-600 text-white px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Approved */}

                      {appointment.status === "Approved" && (
                        <div className="space-y-2 w-full">
                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Completed")
                            }
                            className="w-full min-w-0 bg-blue-600 text-white px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition break-words"
                          >
                            Complete Appointment
                          </button>

                          {appointment.paymentStatus === "Pending" && (
                            <button
                              onClick={() =>
                                updatePaymentStatus(appointment._id)
                              }
                              className="w-full min-w-0 bg-green-600 text-white px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      )}

                      {/* Payment Pending for other statuses */}

                      {appointment.status !== "Approved" &&
                        appointment.status !== "Pending" &&
                        appointment.paymentStatus === "Pending" && (
                          <button
                            onClick={() => updatePaymentStatus(appointment._id)}
                            className="w-full min-w-0 bg-green-600 text-white px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition"
                          >
                            Mark Paid
                          </button>
                        )}

                      {/* Rejected */}

                      {appointment.status === "Rejected" &&
                        appointment.paymentStatus !== "Pending" && (
                          <p className="text-gray-400 text-sm text-center">
                            No action
                          </p>
                        )}

                      {/* Completed */}

                      {appointment.status === "Completed" &&
                        appointment.paymentStatus !== "Pending" && (
                          <p className="text-gray-400 text-sm text-center">
                            Completed
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ================================================= */}
              {/* DESKTOP TABLE */}
              {/* 1024px AND ABOVE */}
              {/* ================================================= */}

              <div className="hidden lg:block w-full max-w-full overflow-x-auto">
                <table className="w-full min-w-[1200px] border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-left">
                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Patient
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Age
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Gender
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Phone
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Date
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Time
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Reason
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Fee
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Payment
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>

                      <th className="p-4 text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* Patient */}

                        <td className="p-4 font-semibold text-sm whitespace-nowrap">
                          {appointment.patientId?.userId?.name || "Patient"}
                        </td>

                        {/* Age */}

                        <td className="p-4 text-sm whitespace-nowrap">
                          {appointment.patientId?.age || "N/A"}
                        </td>

                        {/* Gender */}

                        <td className="p-4 text-sm whitespace-nowrap">
                          {appointment.patientId?.gender || "N/A"}
                        </td>

                        {/* Phone */}

                        <td className="p-4 text-sm whitespace-nowrap">
                          {appointment.patientId?.phone || "N/A"}
                        </td>

                        {/* Date */}

                        <td className="p-4 text-sm whitespace-nowrap">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </td>

                        {/* Time */}

                        <td className="p-4 text-sm whitespace-nowrap">
                          {appointment.appointmentTime}
                        </td>

                        {/* Reason */}

                        <td className="p-4 text-sm max-w-[180px]">
                          <p className="truncate">
                            {appointment.reason || "N/A"}
                          </p>
                        </td>

                        {/* Fee */}

                        <td className="p-4 font-semibold text-sm whitespace-nowrap">
                          ₹{appointment.consultationFee}
                        </td>

                        {/* Payment */}

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                              appointment.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.paymentStatus || "Pending"}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusStyle(
                              appointment.status,
                            )}`}
                          >
                            {appointment.status}
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="p-4">
                          <div className="flex flex-wrap gap-2 min-w-[170px]">
                            {appointment.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(appointment._id, "Approved")
                                  }
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition whitespace-nowrap"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() =>
                                    updateStatus(appointment._id, "Rejected")
                                  }
                                  className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition whitespace-nowrap"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {appointment.status === "Approved" && (
                              <button
                                onClick={() =>
                                  updateStatus(appointment._id, "Completed")
                                }
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition whitespace-nowrap"
                              >
                                Complete
                              </button>
                            )}

                            {appointment.status === "Approved" &&
                              appointment.paymentStatus === "Pending" && (
                                <button
                                  onClick={() =>
                                    updatePaymentStatus(appointment._id)
                                  }
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition whitespace-nowrap"
                                >
                                  Mark Paid
                                </button>
                              )}

                            {appointment.status === "Rejected" && (
                              <span className="text-gray-400 text-sm whitespace-nowrap">
                                No action
                              </span>
                            )}

                            {appointment.status === "Completed" && (
                              <span className="text-gray-400 text-sm whitespace-nowrap">
                                Completed
                              </span>
                            )}
                          </div>
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
    </div>
  );
};

export default Appointments;
