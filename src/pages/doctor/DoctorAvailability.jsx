import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState(
    days.map((day) => ({
      day,
      startTime: "10:00",
      endTime: "14:00",
      isAvailable: false,
    })),
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data } = await api.get("/doctors/availability");

      const existingAvailability = data.availability || [];

      const updatedAvailability = days.map((day) => {
        const existing = existingAvailability.find((item) => item.day === day);

        return (
          existing || {
            day,
            startTime: "10:00",
            endTime: "14:00",
            isAvailable: false,
          }
        );
      });

      setAvailability(updatedAvailability);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to load availability",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (index) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              isAvailable: !item.isAvailable,
            }
          : item,
      ),
    );
  };

  const handleTimeChange = (index, field, value) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await api.put("/doctors/availability", {
        availability,
      });

      toast.success("Availability updated successfully");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to update availability",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading availability...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Doctor Availability
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Select your working days and set your available time.
          </p>
        </div>

        {/* Card */}

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="space-y-4">
            {availability.map((item, index) => (
              <div
                key={item.day}
                className={`border rounded-xl p-4 transition ${
                  item.isAvailable
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                {/* Day */}

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Checkbox + Day */}

                  <div className="flex items-center gap-3 lg:w-40">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      onChange={() => handleToggle(index)}
                      className="w-5 h-5 accent-blue-600 cursor-pointer"
                    />

                    <label className="font-semibold text-gray-800 cursor-pointer">
                      {item.day}
                    </label>
                  </div>

                  {/* Time */}

                  {item.isAvailable ? (
                    <div className="flex flex-col sm:flex-row gap-3 flex-1">
                      {/* Start */}

                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          Start Time
                        </label>

                        <input
                          type="time"
                          value={item.startTime}
                          onChange={(e) =>
                            handleTimeChange(index, "startTime", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* End */}

                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          End Time
                        </label>

                        <input
                          type="time"
                          value={item.endTime}
                          onChange={(e) =>
                            handleTimeChange(index, "endTime", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">Not Available</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Save */}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
