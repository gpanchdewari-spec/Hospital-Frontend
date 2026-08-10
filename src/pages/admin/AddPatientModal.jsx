import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const AddPatientModal = ({ onClose, fetchPatients }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
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
        "/patients",
        {
          ...formData,
          age: Number(formData.age),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Patient Added Successfully");

      fetchPatients();

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to Add Patient");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[600px]">
        <h2 className="text-2xl font-bold mb-5">Add Patient</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
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
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="bloodGroup"
            placeholder="Blood Group"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="col-span-2 flex justify-end gap-3">
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
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
