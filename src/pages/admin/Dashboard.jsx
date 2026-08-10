import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalBookingAmount: 0,
    totalPaidAmount: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/dashboard/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        <StatCard
          title="Doctors"
          value={stats.totalDoctors}
          color="text-blue-600"
        />

        <StatCard
          title="Patients"
          value={stats.totalPatients}
          color="text-green-600"
        />

        <StatCard
          title="Appointments"
          value={stats.totalAppointments}
          color="text-purple-600"
        />

        <StatCard
          title="Total Booking Amount"
          value={`₹${stats.totalBookingAmount}`}
          color="text-orange-600"
        />

        <StatCard
          title="Total Paid Amount"
          value={`₹${stats.totalPaidAmount}`}
          color="text-green-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
