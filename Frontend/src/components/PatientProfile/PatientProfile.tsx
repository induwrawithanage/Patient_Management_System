import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import PatientHeader from './PatientHeader';
import VitalsGrid from './VitalsGrid';
import PatientHistory from './PatientHistory';
import BackgroundDecorations from './BackgroundDecorations';

interface PatientProfileProps {
  patientId?: string;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patientId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole] = useState<'patient' | 'doctor' | 'admin'>('doctor'); // Simulated role

  // TODO: Use patientId to fetch specific patient data when backend is ready
  console.log('Patient ID:', patientId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <BackgroundDecorations />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} userRole={userRole} />
        
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
            <PatientHeader userRole={userRole} />

            {/* Vitals Grid */}
            <VitalsGrid />

            {/* Patient History */}
            <PatientHistory />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;