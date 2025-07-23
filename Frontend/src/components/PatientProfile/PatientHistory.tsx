import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronUp, Download, Calendar, AlertTriangle,
  CheckCircle, Clock, FileText, Pill, Plus, X
} from 'lucide-react';

const PatientHistory = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      date: '15 Nov 2023',
      diagnosis: 'Hypertension Follow-up',
      testsPerformed: ['Blood Pressure Monitoring', 'ECG', 'Blood Test'],
      prescription: 'Lisinopril 10mg, Amlodipine 5mg',
      status: 'Completed',
      severity: 'Medium',
      doctor: 'Dr. Sarah Johnson',
      hasDocument: true,
      notes: 'Patient responding well to medication'
    },
    {
      id: 2,
      date: '22 Oct 2023',
      diagnosis: 'Diabetes Type 2 Management',
      testsPerformed: ['HbA1c Test', 'Glucose Tolerance Test', 'Lipid Profile'],
      prescription: 'Metformin 500mg twice daily',
      status: 'Completed',
      severity: 'High',
      doctor: 'Dr. Michael Chen',
      hasDocument: true,
      notes: 'Blood sugar levels improving'
    }
  ]);

  const [formData, setFormData] = useState({
    date: '',
    diagnosis: '',
    testsPerformed: '',
    prescription: '',
    status: 'Completed',
    severity: 'Low',
    doctor: '',
    notes: '',
    hasDocument: false
  });

  const handleAddHistory = () => {
    const newEntry = {
      ...formData,
      id: Date.now(),
      testsPerformed: formData.testsPerformed.split(',').map(test => test.trim())
    };
    setHistoryData([newEntry, ...historyData]);
    setFormData({
      date: '', diagnosis: '', testsPerformed: '', prescription: '',
      status: 'Completed', severity: 'Low', doctor: '', notes: '', hasDocument: false
    });
    setShowForm(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return <AlertTriangle size={12} />;
      case 'medium': return <Clock size={12} />;
      case 'low': return <CheckCircle size={12} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Medical History</h2>
            <p className="text-gray-400">Complete record of patient visits and treatments</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl border border-blue-500/30 transition"
            >
              <Plus size={18} />
              <span className="font-medium">Add History</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition"
            >
              <span className="text-white font-medium">
                {isExpanded ? 'Collapse' : 'Expand'}
              </span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* History Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 lg:p-8 space-y-6">
              {historyData.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-white font-semibold text-lg">{record.date}</span>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(record.severity)}`}>
                          {getSeverityIcon(record.severity)}
                          <span className="ml-1">{record.severity}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{record.diagnosis}</h3>
                      <p className="text-gray-400">Treated by {record.doctor}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <div className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                        <CheckCircle size={14} className="mr-1" />
                        <span className="text-sm font-medium">{record.status}</span>
                      </div>
                      {record.hasDocument && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30"
                        >
                          <Download size={16} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <FileText size={16} className="text-blue-400" />
                        <h4 className="text-blue-400 font-semibold">Tests Performed</h4>
                      </div>
                      <ul className="space-y-1">
                        {record.testsPerformed.map((test, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {test}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <Pill size={16} className="text-green-400" />
                        <h4 className="text-green-400 font-semibold">Prescription</h4>
                      </div>
                      <p className="text-gray-300 text-sm">{record.prescription}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <FileText size={16} className="text-purple-400" />
                        <h4 className="text-purple-400 font-semibold">Notes</h4>
                      </div>
                      <p className="text-gray-300 text-sm">{record.notes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-xl w-full max-w-2xl text-white space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Add Medical History</h3>
                <button onClick={() => setShowForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <input
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Date (e.g., 23 Jul 2025)"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Tests (comma separated)"
                value={formData.testsPerformed}
                onChange={e => setFormData({ ...formData, testsPerformed: e.target.value })}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Prescription"
                value={formData.prescription}
                onChange={e => setFormData({ ...formData, prescription: e.target.value })}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Doctor's Name"
                value={formData.doctor}
                onChange={e => setFormData({ ...formData, doctor: e.target.value })}
              />
              <textarea
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20"
                placeholder="Notes"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddHistory}
                  className="px-5 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30"
                >
                  Add Entry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PatientHistory;
