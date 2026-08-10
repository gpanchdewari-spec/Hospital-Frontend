import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditPatientModal = ({ patient, onClose, fetchPatients }) => {
  const [formData, setFormData] = useState({
    age: patient.age,
    gender: patient.gender,
    bloodGroup: patient.bloodGroup,
    phone: patient.phone,
    address: patient.address,
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
      const token = localStorage.getItem("token");

      await api.put(`/patients/${patient._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Patient Updated");

      fetchPatients();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[500px] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Patient</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Age"
          />

          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Gender"
          />

          <input
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Blood Group"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Phone"
          />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Address"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
