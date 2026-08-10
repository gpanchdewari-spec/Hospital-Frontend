import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const AddDoctorModal = ({ onClose, fetchDoctors }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    about: "",
    availableDays: "",
    start: "",
    end: "",
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

      await api.post(
        "/doctors",
        {
          ...formData,
          experience: Number(formData.experience),
          consultationFee: Number(formData.consultationFee),
          availableDays: formData.availableDays.split(","),
          availableTime: {
            start: formData.start,
            end: formData.end,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Doctor Added");

      fetchDoctors();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[600px]">
        <h2 className="text-2xl font-bold mb-5">Add Doctor</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="url"
            name="profileImage"
            placeholder="Doctor Image URL"
            value={formData.profileImage}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="consultationFee"
            placeholder="Fee"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="availableDays"
            placeholder="Monday,Wednesday"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="start"
            placeholder="09:00"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="end"
            placeholder="05:00"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="about"
            placeholder="About Doctor"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />

          <div className="col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded">
              Save Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
