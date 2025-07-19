import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowRight } from 'lucide-react';

const MembershipCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <Crown size={24} className="text-yellow-300" />
          <span className="font-bold text-lg">Premium Member</span>
        </div>

        {/* Days Left */}
        <div className="mb-4">
          <div className="text-3xl font-bold mb-1">20</div>
          <div className="text-orange-100">Days Left</div>
        </div>

        {/* Benefits */}
        <div className="text-sm text-orange-100 mb-6">
          • Priority appointments
          • Free consultations
          • 24/7 support access
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-lg px-4 py-2 flex items-center justify-center space-x-2 transition-colors"
        >
          <span className="font-medium">Check Now</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MembershipCard;