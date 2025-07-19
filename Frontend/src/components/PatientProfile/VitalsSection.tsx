import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, Zap, Info } from 'lucide-react';

const VitalsSection = () => {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const vitals = [
    {
      id: 'bp',
      icon: Heart,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      normalRange: '90/60 - 120/80 mmHg',
      color: 'text-green-400'
    },
    {
      id: 'hr',
      icon: Activity,
      label: 'Heart Rate',
      value: '120',
      unit: 'BPM',
      status: 'high',
      normalRange: '60 - 100 BPM',
      color: 'text-orange-400'
    },
    {
      id: 'glucose',
      icon: Droplets,
      label: 'Glucose',
      value: '97',
      unit: 'mg/dL',
      status: 'normal',
      normalRange: '70 - 140 mg/dL',
      color: 'text-green-400'
    },
    {
      id: 'cholesterol',
      icon: Zap,
      label: 'Cholesterol',
      value: '85',
      unit: 'mg/dL',
      status: 'normal',
      normalRange: '< 200 mg/dL',
      color: 'text-green-400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'In the norm';
      case 'high': return 'Above the norm';
      case 'low': return 'Below the norm';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Current Vitals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vitals.map((vital, index) => {
            const Icon = vital.icon;
            return (
              <motion.div
                key={vital.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="relative bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                onMouseEnter={() => setTooltipVisible(vital.id)}
                onMouseLeave={() => setTooltipVisible(null)}
              >
                {/* Tooltip */}
                {tooltipVisible === vital.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10"
                  >
                    Normal: {vital.normalRange}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </motion.div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} className={vital.color} />
                  <Info size={14} className="text-gray-500" />
                </div>
                
                <h3 className="text-gray-400 text-sm font-medium mb-1">{vital.label}</h3>
                <div className="flex items-baseline space-x-1 mb-3">
                  <span className="text-2xl font-bold text-white">{vital.value}</span>
                  <span className="text-gray-400 text-sm">{vital.unit}</span>
                </div>
                
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vital.status)}`}>
                  {getStatusText(vital.status)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Last updated: Today at 2:30 PM</p>
        </div>
      </motion.div>
    </div>
  );
};

export default VitalsSection;