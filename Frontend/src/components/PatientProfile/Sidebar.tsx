import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Menu,
  X,
  Clock,
  Bell
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: 'patient' | 'doctor' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, userRole }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Users, label: 'Patients', active: true },
    { icon: Calendar, label: 'Appointments', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
   
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: isOpen ? 0 : -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 z-40 lg:relative lg:translate-x-0 lg:z-10"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl">MediCare</span>
              <p className="text-gray-400 text-sm">Health System</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                alt="Dr. Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <h3 className="text-white font-semibold">Dr. Sarah Johnson</h3>
                <p className="text-gray-400 text-sm capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Notification Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={16} className="text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">Reminder</span>
            </div>
            <p className="text-white text-sm mb-3">Next patient checkup in 20 days</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-orange-500/30 hover:bg-orange-500/40 border border-orange-500/50 rounded-lg px-3 py-2 text-orange-300 text-sm font-medium transition-all duration-200"
            >
              View Schedule
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;