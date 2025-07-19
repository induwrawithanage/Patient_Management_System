import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Sidebar removed; navbar will be used instead
import PatientHeader from '../components/PatientProfile/PatientHeader';
import VitalsGrid from '../components/PatientProfile/VitalsGrid';
import PatientHistory from '../components/PatientProfile/PatientHistory';
import BackgroundDecorations from '../components/PatientProfile/BackgroundDecorations';

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
      
      {/* Navbar (converted from Sidebar) */}
      <header className="border-b border-gray-900 bg-white/10 dark:bg-black/40 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="MediSync Logo"
              className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
            />
            <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
          </div>
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden flex items-center px-3 py-2 rounded text-gray-200 hover:bg-white/10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Dashboard</button>
            <button className="px-4 py-2 rounded-lg text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10 font-medium">Patients</button>
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Appointments</button>
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Reports</button>
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Settings</button>
          </nav>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-800 px-4 py-2 flex flex-col space-y-2 shadow-xl z-50">
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-white/10 transition-all font-medium">Dashboard</button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10 font-medium">Patients</button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-white/10 transition-all font-medium">Appointments</button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-white/10 transition-all font-medium">Reports</button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-white/10 transition-all font-medium">Settings</button>
          </div>
        )}
        {/* User Profile & Notification removed as requested */}
      </header>
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