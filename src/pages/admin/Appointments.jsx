import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(data.appointments);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/appointments/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment deleted");

      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to delete appointment",
      );
    }
  };

  const getStatusClass = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Completed") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      {/* ================= HEADER ================= */}

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Appointments
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage all patient appointments.
        </p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full min-w-[950px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  {/* Patient */}

                  <td className="p-4 text-left font-semibold">
                    {appointment.patientId?.userId?.name || "N/A"}
                  </td>

                  {/* Doctor */}

                  <td className="p-4 text-left">
                    Dr. {appointment.doctorId?.userId?.name || "N/A"}
                  </td>

                  {/* Date */}

                  <td className="p-4">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </td>

                  {/* Time */}

                  <td className="p-4">
                    {appointment.appointmentTime || "N/A"}
                  </td>

                  {/* Reason */}

                  <td className="p-4 text-left max-w-xs break-words">
                    {appointment.reason || "N/A"}
                  </td>

                  {/* Status */}

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusClass(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          updateStatus(appointment._id, "Approved")
                        }
                        className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(appointment._id, "Rejected")
                        }
                        className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => deleteAppointment(appointment._id)}
                        className="bg-red-700 text-white px-3 py-1.5 rounded hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}

      <div className="md:hidden space-y-4">
        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">No appointments found.</p>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5"
            >
              {/* Patient */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Patient</p>

                <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                  {appointment.patientId?.userId?.name || "N/A"}
                </h2>
              </div>

              {/* Doctor */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Doctor</p>

                <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
                  Dr. {appointment.doctorId?.userId?.name || "N/A"}
                </p>
              </div>

              {/* Date & Time */}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Date</p>

                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Time</p>

                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {appointment.appointmentTime || "N/A"}
                  </p>
                </div>
              </div>

              {/* Reason */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Reason</p>

                <p className="text-sm sm:text-base text-gray-700 break-words">
                  {appointment.reason || "N/A"}
                </p>
              </div>

              {/* Status */}

              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-2">Status</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                    appointment.status,
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>

              {/* Actions */}

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 min-[450px]:grid-cols-3 gap-2">
                  <button
                    onClick={() => updateStatus(appointment._id, "Approved")}
                    className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(appointment._id, "Rejected")}
                    className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    className="bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
