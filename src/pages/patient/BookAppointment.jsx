import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);

  // Get doctorId from URL
  const [searchParams] = useSearchParams();
  const doctorIdFromUrl = searchParams.get("doctorId");

  const [formData, setFormData] = useState({
    doctorId: doctorIdFromUrl || "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/doctors/public");

      setDoctors(data.doctors || []);

      // Automatically select doctor from URL
      if (doctorIdFromUrl) {
        setFormData((prev) => ({
          ...prev,
          doctorId: doctorIdFromUrl,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load doctors");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", formData);

      toast.success("Appointment Booked Successfully");

      setFormData({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment",
      );
    }
  };

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 md:px-6 py-0 sm:py-0">
      {/* Container */}
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Book Appointment
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Schedule an appointment with your preferred doctor.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Doctor */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Select Doctor
              </label>

              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose Doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.userId?.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {formData.doctorId && (
                <p className="mt-2 font-semibold text-blue-600">
                  Consultation Fee: ₹
                  {doctors.find((doctor) => doctor._id === formData.doctorId)
                    ?.consultationFee || 0}
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Appointment Time
                </label>

                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Reason
              </label>

              <textarea
                rows="5"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Describe your problem..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
