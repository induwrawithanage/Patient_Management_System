import React, { useState } from 'react';
import { Calendar, FileText, Download, Eye, Filter, Search, ChevronDown, Activity, Heart, Thermometer, Weight } from 'lucide-react';

const PatientHealthRecords = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock data for health reports
  const healthReports = [
    {
      id: 1,
      title: 'Annual Physical Examination',
      date: '2024-03-15',
      type: 'Physical Exam',
      doctor: 'Dr. Sarah Johnson',
      status: 'Completed',
      summary: 'Complete physical examination with blood work and vitals assessment.',
      results: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '165 lbs',
        height: '5\'8"'
      }
    },
    {
      id: 2,
      title: 'Blood Test Results',
      date: '2024-02-28',
      type: 'Laboratory',
      doctor: 'Dr. Michael Chen',
      status: 'Completed',
      summary: 'Comprehensive metabolic panel and lipid profile analysis.',
      results: {
        cholesterol: '185 mg/dL',
        glucose: '92 mg/dL',
        hemoglobin: '14.2 g/dL',
        whiteBloodCells: '7,200/μL'
      }
    },
    {
      id: 3,
      title: 'Cardiology Consultation',
      date: '2024-01-20',
      type: 'Consultation',
      doctor: 'Dr. Emily Rodriguez',
      status: 'Completed',
      summary: 'Follow-up consultation for heart palpitations with EKG.',
      results: {
        ekg: 'Normal sinus rhythm',
        bloodPressure: '118/76 mmHg',
        heartRate: '68 bpm',
        recommendation: 'Continue monitoring'
      }
    },
    {
      id: 4,
      title: 'X-Ray Chest',
      date: '2023-12-10',
      type: 'Imaging',
      doctor: 'Dr. Robert Kim',
      status: 'Completed',
      summary: 'Chest X-ray for routine screening and cough evaluation.',
      results: {
        findings: 'Clear lungs, normal heart size',
        impression: 'No acute abnormalities',
        followUp: 'None required'
      }
    },
    {
      id: 5,
      title: 'Dermatology Screening',
      date: '2023-11-05',
      type: 'Screening',
      doctor: 'Dr. Lisa Park',
      status: 'Completed',
      summary: 'Annual skin cancer screening and mole evaluation.',
      results: {
        findings: 'Two benign moles identified',
        recommendation: 'Annual follow-up',
        biopsy: 'Not required'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'physical exam': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'laboratory': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'consultation': return <Heart className="w-5 h-5 text-red-600" />;
      case 'imaging': return <Eye className="w-5 h-5 text-green-600" />;
      case 'screening': return <Thermometer className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredReports = healthReports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || report.type.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow">Health Records</h1>
          <p className="text-white">View and manage your medical history and test results</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports, doctors, or conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-cyan-700 bg-black/30 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-white"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-cyan-700 bg-black/30 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="all">All Types</option>
                <option value="physical">Physical Exam</option>
                <option value="laboratory">Laboratory</option>
                <option value="consultation">Consultation</option>
                <option value="imaging">Imaging</option>
                <option value="screening">Screening</option>
              </select>
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(report.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                      <p className="text-sm text-white">{report.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} bg-opacity-80`}> 
                    {report.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Calendar className="w-4 h-4" />
                    {new Date(report.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Activity className="w-4 h-4" />
                    {report.doctor}
                  </div>
                </div>

                <p className="text-white text-sm mb-4">{report.summary}</p>

                {/* Key Results Preview */}
                <div className="bg-black/30 rounded-lg p-3 mb-4 border border-cyan-900/30">
                  <h4 className="text-sm font-medium text-white mb-2">Key Results:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(report.results).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-xs">
                        <span className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-white font-medium ml-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedRecord(report)}
                    className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 text-sm shadow"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-cyan-700 text-white rounded-lg hover:bg-cyan-900/30 transition-colors flex items-center gap-2 text-sm shadow">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Record Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-cyan-900/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedRecord.title}</h2>
                    <p className="text-white mt-1">{selectedRecord.type} • {selectedRecord.doctor}</p>
                    <p className="text-sm text-white mt-1">
                      {new Date(selectedRecord.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedRecord(null)}
                    className="text-white hover:text-cyan-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
                    <p className="text-white">{selectedRecord.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Detailed Results</h3>
                    <div className="bg-black/30 rounded-lg p-4 border border-cyan-900/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedRecord.results).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-cyan-900/20 last:border-b-0">
                            <span className="text-white font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="text-white font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-cyan-900/30">
                    <button className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2 shadow">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button 
                      onClick={() => setSelectedRecord(null)}
                      className="px-6 py-2 border border-cyan-700 text-white rounded-lg hover:bg-cyan-900/30 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <FileText className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No records found</h3>
            <p className="text-white">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHealthRecords;