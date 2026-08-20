import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [searchParams] = useSearchParams();
  const doctorIdFromUrl = searchParams.get("doctorId");

  const [formData, setFormData] = useState({
    doctorId: doctorIdFromUrl || "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  // ==============================
  // Fetch Doctors
  // ==============================

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/doctors/public");

      setDoctors(data.doctors || []);

      if (doctorIdFromUrl) {
        setFormData((prev) => ({
          ...prev,
          doctorId: doctorIdFromUrl,
        }));
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to load doctors");
    }
  };

  // ==============================
  // Fetch Available Slots
  // ==============================

  const fetchSlots = async (doctorId, date) => {
    if (!doctorId || !date) {
      setSlots([]);
      return;
    }

    try {
      setLoadingSlots(true);

      setSlots([]);

      setFormData((prev) => ({
        ...prev,
        appointmentTime: "",
      }));

      const { data } = await api.get(
        `/appointments/slots/${doctorId}?date=${date}`,
      );

      setSlots(data.slots || []);

      if (!data.slots || data.slots.length === 0) {
        toast.error(data.message || "No slots available for this date");
      }
    } catch (error) {
      console.log(error);

      setSlots([]);

      toast.error(
        error.response?.data?.message || "Unable to fetch available slots",
      );
    } finally {
      setLoadingSlots(false);
    }
  };

  // ==============================
  // Handle Input
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // When doctor changes
    if (name === "doctorId") {
      setSlots([]);

      setFormData((prev) => ({
        ...prev,
        doctorId: value,
        appointmentTime: "",
      }));

      // If date already selected
      if (formData.appointmentDate && value) {
        fetchSlots(value, formData.appointmentDate);
      }
    }

    // When date changes
    if (name === "appointmentDate") {
      setSlots([]);

      setFormData((prev) => ({
        ...prev,
        appointmentDate: value,
        appointmentTime: "",
      }));

      if (formData.doctorId && value) {
        fetchSlots(formData.doctorId, value);
      }
    }
  };

  // ==============================
  // Book Appointment
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appointmentTime) {
      toast.error("Please select an available time slot");
      return;
    }

    try {
      await api.post("/appointments", formData);

      toast.success("Appointment Booked Successfully");

      setFormData({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });

      setSlots([]);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to book appointment",
      );
    }
  };

  const selectedDoctor = doctors.find(
    (doctor) => doctor._id === formData.doctorId,
  );

  // ==============================
  // UI
  // ==============================

  return (
    <div className="w-full min-w-0 px-2 sm:px-4 md:px-6 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Book Appointment
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Schedule an appointment with your preferred doctor.
          </p>
        </div>

        {/* Form */}

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
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose Doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.userId?.name} - {doctor.specialization}
                  </option>
                ))}
              </select>

              {/* Fee */}

              {selectedDoctor && (
                <p className="mt-2 font-semibold text-blue-600">
                  Consultation Fee: ₹{selectedDoctor.consultationFee}
                </p>
              )}
            </div>

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
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Slots */}

            {formData.doctorId && formData.appointmentDate && (
              <div>
                <label className="block mb-3 font-semibold text-gray-700">
                  Available Time Slots
                </label>

                {loadingSlots ? (
                  <p className="text-gray-500 text-sm">
                    Loading available slots...
                  </p>
                ) : slots.length === 0 ? (
                  <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <p className="text-red-600 text-sm font-medium">
                      No slots available for this date.
                    </p>

                    <p className="text-red-500 text-xs mt-1">
                      Please select another date.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            appointmentTime: slot,
                          }))
                        }
                        className={`py-3 px-3 rounded-lg border text-sm font-medium transition ${
                          formData.appointmentTime === slot
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

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
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base outline-none resize-y focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Selected Time */}

            {formData.appointmentTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  Selected Time:
                  <span className="font-bold ml-1">
                    {formData.appointmentTime}
                  </span>
                </p>
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={!formData.appointmentTime}
              className={`w-full py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition ${
                formData.appointmentTime
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
