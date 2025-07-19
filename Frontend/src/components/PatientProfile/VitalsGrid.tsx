import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, Zap, TrendingUp, Info } from 'lucide-react';

const VitalsGrid = () => {
  const [hoveredVital, setHoveredVital] = useState<string | null>(null);

  const vitals = [
    {
      id: 'bp',
      icon: Heart,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      normalRange: '90/60 - 120/80 mmHg',
      trend: '+2%',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    {
      id: 'hr',
      icon: Activity,
      label: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      status: 'normal',
      normalRange: '60 - 100 BPM',
      trend: '-1%',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      id: 'oxygen',
      icon: TrendingUp,
      label: 'Oxygen Level',
      value: '98',
      unit: '%',
      status: 'normal',
      normalRange: '95 - 100%',
      trend: '+0.5%',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400'
    },
    {
      id: 'glucose',
      icon: Droplets,
      label: 'Glucose Level',
      value: '95',
      unit: 'mg/dL',
      status: 'normal',
      normalRange: '70 - 140 mg/dL',
      trend: '+3%',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-bold text-white">Current Vitals</h2>
        <div className="text-gray-400 text-sm">
          Last updated: Today at 2:30 PM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitals.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <motion.div
              key={vital.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onHoverStart={() => setHoveredVital(vital.id)}
              onHoverEnd={() => setHoveredVital(null)}
              className="relative group"
            >
              {/* Tooltip */}
              {hoveredVital === vital.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap z-20 border border-white/20"
                >
                  Normal range: {vital.normalRange}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                </motion.div>
              )}

              <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl ${vital.bgColor} group-hover:bg-white/15`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${vital.color} shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-medium ${vital.textColor}`}>
                      {vital.trend}
                    </span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-gray-300 text-sm font-medium mb-2">{vital.label}</h3>

                {/* Value */}
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold text-white">{vital.value}</span>
                  <span className="text-gray-400 text-lg">{vital.unit}</span>
                </div>

                {/* Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${vital.borderColor} ${vital.bgColor} ${vital.textColor}`}>
                  <div className={`w-2 h-2 rounded-full ${vital.color.includes('green') ? 'bg-green-400' : vital.color.includes('blue') ? 'bg-blue-400' : vital.color.includes('purple') ? 'bg-purple-400' : 'bg-orange-400'} mr-2`}></div>
                  Normal Range
                </div>

                {/* Subtle glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vital.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default VitalsGrid;