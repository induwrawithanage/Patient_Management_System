import React, { useState } from 'react';
import { motion } from 'framer-motion';

import PatientHeader from '../components/PatientProfile/PatientHeader';
import VitalsGrid from '../components/PatientProfile/VitalsGrid';
import PatientHistory from '../components/PatientProfile/PatientHistory';
import BackgroundDecorations from '../components/PatientProfile/BackgroundDecorations';
import DashboardNavbar from '../components/DashboardNavbar';

interface PatientProfileProps {
  patientId?: string;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patientId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole] = useState<'patient' | 'doctor' | 'admin'>('doctor'); // Simulated role

  // TODO: Use patientId to fetch specific patient data when backend is ready
  console.log('Patient ID:', patientId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <BackgroundDecorations />
      {/* Custom Dashboard Navigation Bar */}
       <DashboardNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Patient Profile</h1>
            <p className="text-gray-400 text-lg">Comprehensive medical information and records</p>
          </div>

          {/* Patient Header Card */}
          <PatientHeader userRole="doctor" />

          {/* Vitals Grid */}
          <VitalsGrid />

          {/* Patient History */}
          <PatientHistory />
        </motion.div>
      </main>
    </div>
  );
};

export default PatientProfile;