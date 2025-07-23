import DoctorPatientRecords from '../components/Reports/doctorreport';
import PatientHealthRecords from '../components/Reports/patientreport';
import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

export default function ReportWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDoctor = localStorage.getItem('isDoctor') === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden dark:bg-black">
      <DashboardNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="max-w-7xl mx-auto p-6 lg:p-8 relative z-10">
        {isDoctor ? <DoctorPatientRecords /> : <PatientHealthRecords />}
      </div>
    </div>
  );
}