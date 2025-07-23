import { useState } from "react";
import Navigation from "../components/NewPatient/Navigation";
import PatientProfile from "../components/NewPatient/PatientProfile";
import MedicalHistory from "../components/NewPatient/MedicalHistory";
import HealthcareConnections from "../components/NewPatient/HealthcareConnections";
import Analytics from "../components/NewPatient/Analytics";
import Messaging from "../components/NewPatient/Messaging";
import Records from "./record";
import { Heart, Shield, MessageCircle } from "lucide-react";

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
      case 'records':
        return <Records />;
      default:
        return <PatientProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-primary" />
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HealthConnect</h1>
                <p className="text-sm text-muted-foreground">Patient Health Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('messaging')}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                title="Health Assistant Chat"
              >
                <MessageCircle className="h-5 w-5 text-primary" />
              </button>
              <div className="text-sm text-muted-foreground">
                Welcome, John Doe
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </main>
    </div>
  );
};

export default NewPatient;