import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Calendar, Droplets, Activity, MapPin, Clock } from 'lucide-react';

const PatientDetails = () => {
  const patientInfo = [
    { icon: User, label: 'Full Name', value: 'Mrs. Maria Watson' },
    { icon: Mail, label: 'Email', value: 'mariawatson@gmail.com' },
    { icon: User, label: 'Gender', value: 'Female' },
    { icon: Calendar, label: 'Age', value: '34 years' },
    { icon: Droplets, label: 'Blood Group', value: 'O+' },
    { icon: Activity, label: 'Status', value: 'Active', status: 'success' },
    { icon: MapPin, label: 'Department', value: 'Cardiology' },
    { icon: Clock, label: 'Appointment', value: 'APT-001' },
    { icon: MapPin, label: 'Bed Number', value: 'B-205' },
    { icon: Calendar, label: 'Registered', value: '15 Jan 2023' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-fit"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Patient Details</h2>
      
      <div className="space-y-4">
        {patientInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-700">
                  <Icon size={16} className="text-gray-300" />
                </div>
                <span className="text-gray-400 font-medium">{item.label}</span>
              </div>
              <span 
                className={`font-semibold ${
                  item.status === 'success' ? 'text-green-400' :
                  item.status === 'warning' ? 'text-orange-400' :
                  item.status === 'error' ? 'text-red-400' :
                  'text-white'
                }`}
              >
                {item.value}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <h3 className="text-red-400 font-semibold mb-2">Emergency Contact</h3>
        <p className="text-white">John Watson (Husband)</p>
        <p className="text-gray-400">+94 77 123 4567</p>
      </div>
    </motion.div>
  );
};

export default PatientDetails;