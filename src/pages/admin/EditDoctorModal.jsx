import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditDoctorModal = ({ doctor, onClose, fetchDoctors }) => {
  const [formData, setFormData] = useState({
    specialization: doctor.specialization,
    qualification: doctor.qualification,
    experience: doctor.experience,
    consultationFee: doctor.consultationFee,
    about: doctor.about,
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

      await api.put(`/doctors/${doctor._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Doctor Updated");

      fetchDoctors();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[500px] p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Edit Doctor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="consultationFee"
            value={formData.consultationFee}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorModal;


