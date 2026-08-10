import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AddDoctorModal from "./AddDoctorModal";
import EditDoctorModal from "./EditDoctorModal";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Doctor deleted successfully");

      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Doctors
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage all hospital doctors.
          </p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          + Add Doctor
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full min-w-[800px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Specialization</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Fee</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-4 text-left font-semibold">
                    {doctor.userId?.name || "N/A"}
                  </td>

                  <td className="p-4 text-left">
                    {doctor.userId?.email || "N/A"}
                  </td>

                  <td className="p-4 text-left">
                    {doctor.specialization || "N/A"}
                  </td>

                  <td className="p-4 text-left">
                    {doctor.experience || 0} Years
                  </td>

                  <td className="p-4 text-left">
                    ₹{doctor.consultationFee || 0}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditDoctor(doctor)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteDoctor(doctor._id)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
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
        {doctors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">No doctors found.</p>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5"
            >
              {/* Doctor Name */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Doctor Name</p>

                <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                  Dr. {doctor.userId?.name || "N/A"}
                </h2>
              </div>

              {/* Details */}

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>

                  <p className="text-sm sm:text-base text-gray-700 break-all">
                    {doctor.userId?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Specialization</p>

                  <p className="text-sm sm:text-base font-medium text-gray-800 break-words">
                    {doctor.specialization || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>

                    <p className="text-sm sm:text-base font-semibold">
                      {doctor.experience || 0} Years
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Consultation Fee</p>

                    <p className="text-sm sm:text-base font-semibold text-blue-600">
                      ₹{doctor.consultationFee || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="flex gap-3 mt-5 pt-4 border-t">
                <button
                  onClick={() => setEditDoctor(doctor)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteDoctor(doctor._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= ADD DOCTOR MODAL ================= */}

      {showModal && (
        <AddDoctorModal
          onClose={() => setShowModal(false)}
          fetchDoctors={fetchDoctors}
        />
      )}

      {/* ================= EDIT DOCTOR MODAL ================= */}

      {editDoctor && (
        <EditDoctorModal
          doctor={editDoctor}
          onClose={() => setEditDoctor(null)}
          fetchDoctors={fetchDoctors}
        />
      )}
    </div>
  );
};

export default Doctors;
