import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Droplets, 
  Activity, 
  MapPin, 
  Hash,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface PatientHeaderProps {
  userRole: 'patient' | 'doctor' | 'admin';
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ userRole }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canEdit = userRole === 'doctor' || userRole === 'admin';

  const patientData = {
    name: 'Mrs. Maria Watson',
    email: 'maria.watson@email.com',
    phone: '+1 (555) 123-4567',
    gender: 'Female',
    age: '34 years',
    bloodGroup: 'O+',
    status: 'Active',
    registeredDate: '15 Jan 2023',
    department: 'Cardiology',
    patientId: 'PT-2023-001247',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  };

  const infoItems = [
    { icon: User, label: 'Gender', value: patientData.gender },
    { icon: Calendar, label: 'Age', value: patientData.age },
    { icon: Phone, label: 'Phone', value: patientData.phone },
    { icon: Droplets, label: 'Blood Group', value: patientData.bloodGroup },
    { icon: Activity, label: 'Status', value: patientData.status, status: 'active' },
    { icon: Calendar, label: 'Registered', value: patientData.registeredDate },
    { icon: MapPin, label: 'Department', value: patientData.department },
    { icon: Hash, label: 'Patient ID', value: patientData.patientId },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
      
      {/* Edit Button (visible only for doctors/admins) */}
      {canEdit && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.7, 
            scale: isHovered ? 1 : 0.9 
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-6 right-6 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl border border-blue-500/30 transition-all duration-200 shadow-lg"
        >
          <Edit size={18} />
        </motion.button>
      )}

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-8">
          {/* Avatar */}
          <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
            <div className="relative">
              <img
                src={patientData.avatar}
                alt={patientData.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Name and Email */}
          <div className="text-center lg:text-left flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{patientData.name}</h2>
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 mb-4">
              <Mail size={18} />
              <span className="text-lg">{patientData.email}</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
              <Activity size={16} className="mr-2" />
              <span className="font-medium">Active Patient</span>
            </div>
          </div>
        </div>

        {/* Patient Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Icon size={16} className="text-gray-300" />
                  </div>
                  <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                </div>
                <p className={`font-semibold text-lg ${
                  item.status === 'active' ? 'text-green-400' : 'text-white'
                }`}>
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PatientHeader;