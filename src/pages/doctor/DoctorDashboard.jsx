import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emergencies, setEmergencies] = useState([]);

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

  const pending = appointments.filter(
    (appointment) => appointment.status === "Pending",
  );

  const approved = appointments.filter(
    (appointment) => appointment.status === "Approved",
  );

  const completed = appointments.filter(
    (appointment) => appointment.status === "Completed",
  );

  const totalEarnings = appointments.reduce(
    (total, appointment) =>
      appointment.paymentStatus === "Paid"
        ? total + (appointment.consultationFee || 0)
        : total,
    0,
  );

  const fetchEmergencies = async () => {
    try {
      const { data } = await api.get("/appointments/emergency");

      setEmergencies(data.emergencies || []);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptEmergency = async (id) => {
    try {
      await api.put(`/appointments/emergency/${id}/accept`);

      toast.success("Emergency appointment accepted");

      // Refresh both
      fetchEmergencies();
      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Emergency already accepted by another doctor",
      );

      fetchEmergencies();
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchEmergencies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Doctor Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage your appointments and patients.
          </p>
        </div>
        {/* Emergency Appointments */}

        {emergencies.length > 0 && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚨</span>

              <h2 className="text-xl sm:text-2xl font-bold text-red-600">
                Emergency Requests
              </h2>

              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {emergencies.length}
              </span>
            </div>

            {emergencies.map((emergency) => (
              <div
                key={emergency._id}
                className="bg-red-50 border-2 border-red-300 rounded-xl p-4 sm:p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide">
                      Emergency Appointment
                    </p>

                    <h3 className="text-lg font-bold text-gray-800 mt-1">
                      {emergency.patientId?.userId?.name || "Patient"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Phone: {emergency.patientId?.phone || "N/A"}
                    </p>

                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Emergency</p>

                      <p className="text-sm text-gray-700 break-words">
                        {emergency.reason || "N/A"}
                      </p>
                    </div>

                    <p className="text-lg font-bold text-red-600 mt-3">
                      Fee: ₹{emergency.consultationFee || 10000}
                    </p>
                  </div>

                  <button
                    onClick={() => acceptEmergency(emergency._id)}
                    className="w-full md:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition whitespace-nowrap"
                  >
                    Accept Emergency
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-sm">Total Appointments</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
              {appointments.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-sm">Pending</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500 mt-2">
              {pending.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-sm">Approved</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
              {approved.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <p className="text-gray-500 text-sm">Completed</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mt-2">
              {completed.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 col-span-1">
            <p className="text-gray-500 text-sm">Total Earnings</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
              ₹{totalEarnings}
            </h2>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl shadow-md mt-6 sm:mt-10 p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
            Patient Appointments
          </h2>

          {loading ? (
            <p className="text-gray-500 text-center py-8">
              Loading appointments...
            </p>
          ) : appointments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No appointments found.</p>
            </div>
          ) : (
            <>
              {/* ================================================= */}
              {/* MOBILE CARDS */}
              {/* ================================================= */}

              <div className="block md:hidden space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
                  >
                    {/* Patient + Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Patient</p>

                        <h3 className="font-semibold text-gray-800 text-[10px] whitespace-normal break-normal">
                          {appointment.patientId?.userId?.name || "Patient"}
                        </h3>
                      </div>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
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

                    {/* Patient Information */}
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>

                        <p className="text-sm font-medium text-gray-800 break-all">
                          {appointment.patientId?.phone || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Date</p>

                        <p className="text-sm font-medium text-gray-800">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Time</p>

                        <p className="text-sm font-medium text-gray-800">
                          {appointment.appointmentTime || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Fee</p>

                        <p className="text-sm font-semibold text-gray-800">
                          ₹{appointment.consultationFee || 0}
                        </p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="mt-5">
                      <p className="text-xs text-gray-500">Reason</p>

                      <p className="text-sm text-gray-700 break-words mt-1">
                        {appointment.reason || "N/A"}
                      </p>
                    </div>

                    {/* Payment */}
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs text-gray-500">Payment</p>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.paymentStatus || "Pending"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5">
                      {/* Pending */}
                      {appointment.status === "Pending" && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Approved")
                            }
                            className="bg-green-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Rejected")
                            }
                            className="bg-red-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Approved */}
                      {appointment.status === "Approved" && (
                        <div className="space-y-2">
                          <button
                            onClick={() =>
                              updateStatus(appointment._id, "Completed")
                            }
                            className="w-full bg-blue-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                          >
                            Complete Appointment
                          </button>

                          {appointment.paymentStatus === "Pending" && (
                            <button
                              onClick={() =>
                                updatePaymentStatus(appointment._id)
                              }
                              className="w-full bg-green-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      )}

                      {/* Completed / Rejected payment */}
                      {appointment.status !== "Approved" &&
                        appointment.status !== "Pending" &&
                        appointment.paymentStatus === "Pending" && (
                          <button
                            onClick={() => updatePaymentStatus(appointment._id)}
                            className="w-full bg-green-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                          >
                            Mark Paid
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ================================================= */}
              {/* DESKTOP TABLE */}
              {/* ================================================= */}

              <div className="hidden md:block w-full max-w-full overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4">Patient</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Time</th>
                      <th className="p-4">Reason</th>
                      <th className="p-4">Fee</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4 font-semibold">
                          {appointment.patientId?.userId?.name || "Patient"}
                        </td>

                        <td className="p-4">
                          {appointment.patientId?.phone || "N/A"}
                        </td>

                        <td className="p-4">
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </td>

                        <td className="p-4">{appointment.appointmentTime}</td>

                        <td className="p-4 max-w-xs">{appointment.reason}</td>

                        <td className="p-4 font-semibold">
                          ₹{appointment.consultationFee}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              appointment.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.paymentStatus || "Pending"}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {appointment.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(appointment._id, "Approved")
                                  }
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() =>
                                    updateStatus(appointment._id, "Rejected")
                                  }
                                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
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
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
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
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                                >
                                  Mark Paid
                                </button>
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

export default DoctorDashboard;
