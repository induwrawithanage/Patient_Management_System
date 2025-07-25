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
  ];

  return (
    <nav className="bg-black/40 backdrop-blur-lg shadow-xl rounded-2xl p-3 mb-6 border border-white/10">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
                ${activeTab === tab.id
                  ? "bg-black/50 backdrop-blur-md text-white shadow-md border border-white/20 ring-2 ring-purple-400/30"
                  : "text-gray-200 hover:bg-black/30 hover:text-purple-400 border border-transparent"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;