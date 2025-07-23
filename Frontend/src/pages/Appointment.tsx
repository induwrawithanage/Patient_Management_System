import PatientAppoinmnets from '../components/Appointments/patientappointments';
import DoctorAppointments from '../components/Appointments/doctorappointments';
import DashboardNavbar from '../components/DashboardNavbar';
import React, { useState } from 'react';
export default function AppointmentWrapper() {
  const isDoctor = localStorage.getItem('isDoctor') === 'true';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <DashboardNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isDoctor ? <DoctorAppointments /> : <PatientAppoinmnets />}
      </div>
    </div>
  );
}