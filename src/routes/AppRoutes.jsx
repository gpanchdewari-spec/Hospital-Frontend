import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import Appointments from "../pages/admin/Appointments";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/Appointments";

// Patient Pages
import PatientDashboard from "../pages/patient/Dashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import DoctorAvailability from "../pages/doctor/DoctorAvailability";
import EmergencyAppointment from "../pages/patient/EmergencyAppointment";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        {/* Doctor */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="availability" element={<DoctorAvailability />} />
        </Route>

        {/* Patient */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="emergency" element={<EmergencyAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
