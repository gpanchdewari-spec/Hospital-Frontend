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
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [addingLeave, setAddingLeave] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data } = await api.get("/doctors/availability");

      const existingAvailability = data.availability || [];
      setUnavailableDates(data.unavailableDates || []);

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


  const handleAddLeave = async () => {
    if (!leaveDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setAddingLeave(true);

      const { data } = await api.post("/doctors/unavailable-date", {
        date: leaveDate,
        reason: leaveReason,
      });

      setUnavailableDates(data.unavailableDates || []);

      setLeaveDate("");
      setLeaveReason("");

      toast.success("Leave added successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to add leave");
    } finally {
      setAddingLeave(false);
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
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800">
            Specific Date Leave
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-5">
            Mark a specific date as unavailable without changing your weekly
            schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Leave Date
              </label>

              <input
                type="date"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Reason
              </label>

              <input
                type="text"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="Personal leave"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddLeave}
                disabled={addingLeave}
                className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {addingLeave ? "Adding..." : "Add Leave"}
              </button>
            </div>
          </div>

          {/* Existing Leaves */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              Upcoming Leaves
            </h3>

            {unavailableDates.length === 0 ? (
              <p className="text-gray-500 text-sm">No specific leaves added.</p>
            ) : (
              <div className="space-y-3">
                {unavailableDates.map((leave, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-red-50 border border-red-100 rounded-lg p-4"
                  >
                    <div>
                      <p className="font-semibold text-red-700">
                        {new Date(leave.date).toLocaleDateString()}
                      </p>

                      <p className="text-sm text-gray-600">
                        {leave.reason || "No reason provided"}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-red-600">
                      Unavailable
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
