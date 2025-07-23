import { useState } from "react";
import Navigation from "../components/NewPatient/Navigation";
import PatientProfile from "../components/NewPatient/PatientProfile";
import MedicalHistory from "../components/NewPatient/MedicalHistory";
import HealthcareConnections from "../components/NewPatient/HealthcareConnections";
import Analytics from "../components/NewPatient/Analytics";
import Messaging from "../components/NewPatient/Messaging";
import Records from "./record";
import DashboardNavbar from '../components/DashboardNavbar';
// Removed unused lucide-react icons (Heart, Shield, MessageCircle) for cleanliness

const NewPatient = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PatientProfile />;
      case 'history':
        return <MedicalHistory />;
      case 'connections':
        return <HealthcareConnections />;
      case 'analytics':
        return <Analytics />;
      case 'messaging':
        return <Messaging />;
      default:
        return <PatientProfile />;
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <DashboardNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Main Content with glassmorphism */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl text-white">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default NewPatient;