import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { AlertTriangle, IndianRupee, Send } from "lucide-react";

const EmergencyAppointment = () => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error("Please describe the emergency");
      return;
    }

    if (reason.trim().length < 10) {
      toast.error("Please describe the emergency in more detail");
      return;
    }

    try {
      setLoading(true);

      await api.post("/appointments/emergency", {
        reason: reason.trim(),
      });

      toast.success("Emergency request sent to all doctors");

      setReason("");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to send emergency request",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Emergency Appointment
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Send an urgent appointment request to all doctors.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl">
        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

            <div>
              <h2 className="font-semibold text-red-700">Emergency Request</h2>

              <p className="text-sm text-red-600 mt-1">
                This request will be visible to all doctors. The first doctor
                who accepts it will be assigned to your appointment.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
          {/* Fee */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2.5 rounded-lg">
                <IndianRupee className="w-5 h-5 text-red-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Emergency Consultation Fee
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Fixed emergency charge
                </p>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              ₹10,000
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe your emergency
                <span className="text-red-500 ml-1">*</span>
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={6}
                maxLength={500}
                placeholder="Example: Severe chest pain and difficulty breathing for the last 20 minutes..."
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base outline-none resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">
                  Provide enough information for the doctor.
                </p>

                <p className="text-xs text-gray-400">{reason.length}/500</p>
              </div>
            </div>

            {/* Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-5">
              <p className="text-xs sm:text-sm text-yellow-800">
                After submitting, your request will remain{" "}
                <span className="font-semibold">Pending</span> until a doctor
                accepts it. You can track the status from{" "}
                <span className="font-semibold">My Appointments</span>.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />

              {loading
                ? "Sending Emergency Request..."
                : "Send Emergency Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAppointment;
