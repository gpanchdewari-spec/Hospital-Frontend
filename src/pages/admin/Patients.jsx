import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import EditPatientModal from "./EditPatientModal";
import AddPatientModal from "./AddPatientModal";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPatient, setEditPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(data.patients);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient Deleted");

      fetchPatients();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
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
            Patients
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage all hospital patients.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          + Add Patient
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full min-w-[850px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4">Age</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Blood Group</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-4 text-left font-semibold">
                    {patient.userId?.name || "N/A"}
                  </td>

                  <td className="p-4 text-left">
                    {patient.userId?.email || "N/A"}
                  </td>

                  <td className="p-4">{patient.age || "N/A"}</td>

                  <td className="p-4">{patient.gender || "N/A"}</td>

                  <td className="p-4">{patient.bloodGroup || "N/A"}</td>

                  <td className="p-4">{patient.phone || "N/A"}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditPatient(patient)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletePatient(patient._id)}
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
        {patients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">No patients found.</p>
          </div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5"
            >
              {/* Patient Name */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Patient Name</p>

                <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                  {patient.userId?.name || "N/A"}
                </h2>
              </div>

              {/* Email */}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Email</p>

                <p className="text-sm sm:text-base text-gray-700 break-all">
                  {patient.userId?.email || "N/A"}
                </p>
              </div>

              {/* Patient Details */}

              <div className="grid grid-cols-2 gap-4">
                {/* Age */}

                <div>
                  <p className="text-xs text-gray-500">Age</p>

                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {patient.age || "N/A"}
                  </p>
                </div>

                {/* Gender */}

                <div>
                  <p className="text-xs text-gray-500">Gender</p>

                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {patient.gender || "N/A"}
                  </p>
                </div>

                {/* Blood Group */}

                <div>
                  <p className="text-xs text-gray-500">Blood Group</p>

                  <p className="text-sm sm:text-base font-semibold text-red-600">
                    {patient.bloodGroup || "N/A"}
                  </p>
                </div>

                {/* Phone */}

                <div>
                  <p className="text-xs text-gray-500">Phone</p>

                  <p className="text-sm sm:text-base font-semibold text-gray-800 break-all">
                    {patient.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div className="flex gap-3 mt-5 pt-4 border-t">
                <button
                  onClick={() => setEditPatient(patient)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePatient(patient._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= EDIT PATIENT MODAL ================= */}

      {editPatient && (
        <EditPatientModal
          patient={editPatient}
          onClose={() => setEditPatient(null)}
          fetchPatients={fetchPatients}
        />
      )}

      {/* ================= ADD PATIENT MODAL ================= */}

      {showModal && (
        <AddPatientModal
          onClose={() => setShowModal(false)}
          fetchPatients={fetchPatients}
        />
      )}
    </div>
  );
};

export default Patients;
