import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Edit } from 'lucide-react';

const DoctorProfile = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 relative cursor-pointer"
    >
      {/* Edit Button (appears on hover) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 right-4 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        <Edit size={16} />
      </motion.button>

      {/* Doctor Photo */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
            alt="Dr. Richa Linda"
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
        </div>

        {/* Doctor Info */}
        <h3 className="text-xl font-bold text-white mb-1">Dr. Richa Linda</h3>
        <p className="text-gray-400 text-sm mb-3">MD, DM (Cardiology)</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
              }`}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">4.5</span>
        </div>

        {/* Additional Info */}
        <div className="w-full space-y-2 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Experience:</span>
            <span className="text-white">12 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Patients:</span>
            <span className="text-white">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Success Rate:</span>
            <span className="text-green-400">98%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile;