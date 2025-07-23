import { useState } from "react";
import { Button } from "../../components/ui/button";
import { User, FileText, Users, Heart, TrendingUp, MessageCircle,FileBarChart } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'history', label: 'Medical History', icon: FileText },
    { id: 'connections', label: 'Healthcare Connections', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'messaging', label: 'Chat', icon: MessageCircle },
    { id: 'records', label: 'Records', icon: FileBarChart  }
  ];

  return (
    <nav className="bg-white shadow-xl rounded-2xl p-3 mb-6 border border-gray-100"> {/* Apply card-like shadow and rounded corners */}
      <div className="flex flex-wrap gap-3"> {/* Increased gap for better spacing */}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost" // Always start with ghost to control styles explicitly
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
                ${activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md" // Active state with gradient and shadow
                  : "text-gray-600 hover:bg-gray-100 hover:text-purple-700" // Inactive state with hover effects
                }`}
            >
              <Icon className="h-5 w-5" /> {/* Slightly larger icons */}
              <span className="hidden sm:inline font-medium">{tab.label}</span> {/* Ensure text is hidden on small screens, add font-medium */}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;