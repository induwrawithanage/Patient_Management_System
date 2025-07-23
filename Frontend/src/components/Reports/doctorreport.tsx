import React, { useState } from 'react';
import { Calendar, FileText, Download, Eye, Filter, Search, Plus, Edit3, AlertTriangle, CheckCircle, Clock, User, Phone, Mail, MapPin, Activity, Heart, Thermometer, Weight, Stethoscope, Clipboard, Brain, Pill } from 'lucide-react';

const DoctorPatientRecords = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('records');
  const [showAddRecord, setShowAddRecord] = useState(false);

  // Patient information
  const patientInfo = {
    id: 'P-2024-001',
    name: 'John Mitchell Anderson',
    age: 45,
    gender: 'Male',
    dob: '1979-03-15',
    phone: '+1 (555) 123-4567',
    email: 'j.anderson@email.com',
    address: '123 Oak Street, Springfield, IL 62701',
    emergencyContact: 'Sarah Anderson - Wife - (555) 987-6543',
    insurance: 'Blue Cross Blue Shield - Policy #BC789456123',
    allergies: ['Penicillin', 'Shellfish', 'Latex'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    currentMedications: [
      'Metformin 500mg - Twice daily',
      'Lisinopril 10mg - Once daily',
      'Atorvastatin 20mg - Once daily'
    ]
  };

  // Mock data for health reports
  const healthReports = [
    {
      id: 1,
      title: 'Annual Physical Examination',
      date: '2024-03-15',
      type: 'Physical Exam',
      doctor: 'Dr. Sarah Johnson',
      status: 'Completed',
      priority: 'Routine',
      summary: 'Complete physical examination with blood work and vitals assessment. Patient shows good overall health with controlled diabetes.',
      results: {
        bloodPressure: '130/85 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '185 lbs',
        height: '5\'10"',
        bmi: '26.5'
      },
      notes: 'Patient reports feeling well. Diabetes well controlled with current medication regimen. Recommend continuing current treatment plan.',
      followUp: 'Schedule in 6 months',
      attachments: ['lab_results.pdf', 'vitals_chart.pdf']
    },
    {
      id: 2,
      title: 'Diabetic Follow-up & HbA1c',
      date: '2024-02-28',
      type: 'Laboratory',
      doctor: 'Dr. Michael Chen',
      status: 'Completed',
      priority: 'Important',
      summary: 'Quarterly diabetic monitoring with comprehensive metabolic panel and HbA1c assessment.',
      results: {
        hba1c: '6.8%',
        glucose: '145 mg/dL',
        cholesterol: '195 mg/dL',
        triglycerides: '165 mg/dL',
        creatinine: '1.1 mg/dL',
        bun: '18 mg/dL'
      },
      notes: 'HbA1c slightly elevated from previous visit (6.4%). Consider medication adjustment. Kidney function remains stable.',
      followUp: 'Follow-up in 3 months',
      attachments: ['hba1c_report.pdf', 'metabolic_panel.pdf']
    },
    {
      id: 3,
      title: 'Cardiology Consultation',
      date: '2024-01-20',
      type: 'Consultation',
      doctor: 'Dr. Emily Rodriguez',
      status: 'Completed',
      priority: 'Urgent',
      summary: 'Consultation for chest pain episodes and irregular heartbeat. EKG and stress test performed.',
      results: {
        ekg: 'Normal sinus rhythm with occasional PVCs',
        stressTest: 'Negative for ischemia',
        echocardiogram: 'EF 55%, normal wall motion',
        bloodPressure: '135/88 mmHg',
        heartRate: '68 bpm'
      },
      notes: 'Chest pain likely musculoskeletal. PVCs benign. Blood pressure slightly elevated - may need medication adjustment.',
      followUp: 'Return if symptoms worsen',
      attachments: ['ekg_report.pdf', 'echo_results.pdf', 'stress_test.pdf']
    },
    {
      id: 4,
      title: 'Chest X-Ray & Pulmonary Assessment',
      date: '2023-12-10',
      type: 'Imaging',
      doctor: 'Dr. Robert Kim',
      status: 'Completed',
      priority: 'Routine',
      summary: 'Chest X-ray ordered due to persistent cough lasting 3 weeks. No acute findings.',
      results: {
        findings: 'Clear lung fields bilaterally',
        heartSize: 'Normal cardiac silhouette',
        impression: 'No acute cardiopulmonary abnormalities',
        recommendation: 'Clinical correlation recommended'
      },
      notes: 'Cough resolved with antihistamine treatment. Likely allergic rhinitis.',
      followUp: 'PRN - return if symptoms recur',
      attachments: ['chest_xray.pdf', 'radiology_report.pdf']
    },
    {
      id: 5,
      title: 'Dermatology Consultation',
      date: '2023-11-05',
      type: 'Screening',
      doctor: 'Dr. Lisa Park',
      status: 'Completed',
      priority: 'Routine',
      summary: 'Annual skin cancer screening and evaluation of suspicious mole on back.',
      results: {
        findings: 'Multiple benign nevi, one atypical nevus removed',
        biopsy: 'Benign compound nevus with mild atypia',
        recommendation: 'Annual dermatology follow-up',
        totalMoles: '15 examined'
      },
      notes: 'Patient educated on ABCDE criteria for mole monitoring. Family history of melanoma noted.',
      followUp: 'Annual screening recommended',
      attachments: ['biopsy_report.pdf', 'dermoscopy_images.pdf']
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'important': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'physical exam': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'laboratory': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'consultation': return <Brain className="w-5 h-5 text-red-600" />;
      case 'imaging': return <Eye className="w-5 h-5 text-green-600" />;
      case 'screening': return <Clipboard className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredReports = healthReports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || report.type.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.notes.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Patient Info */}
        <div className="rounded-xl shadow-lg p-6 mb-6 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {patientInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow">{patientInfo.name}</h1>
                <p className="text-gray-300">Patient ID: {patientInfo.id}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                  <span>{patientInfo.age} years old</span>
                  <span>•</span>
                  <span>{patientInfo.gender}</span>
                  <span>•</span>
                  <span>DOB: {new Date(patientInfo.dob).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddRecord(true)}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                Add Record
              </button>
              <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 shadow">
                <Edit3 className="w-4 h-4" />
                Edit Patient
              </button>
            </div>
          </div>

          {/* Quick Info Tabs */}
          <div className="flex gap-6 border-b border-white/20">
            <button 
              onClick={() => setActiveTab('records')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === 'records' 
                  ? 'border-cyan-400 text-cyan-300 font-medium' 
                  : 'border-transparent text-gray-400 hover:text-white/80'
              }`}
            >
              Medical Records
            </button>
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'border-cyan-400 text-cyan-300 font-medium' 
                  : 'border-transparent text-gray-400 hover:text-white/80'
              }`}
            >
              Patient Overview
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Contact Information */}
            <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Phone className="w-4 h-4 text-cyan-300" />
                  <span>{patientInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Mail className="w-4 h-4 text-cyan-300" />
                  <span>{patientInfo.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-200">
                  <MapPin className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <span>{patientInfo.address}</span>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs text-gray-400 font-medium mb-1">Emergency Contact:</p>
                  <p className="text-sm text-gray-200">{patientInfo.emergencyContact}</p>
                </div>
              </div>
            </div>

            {/* Medical Alerts */}
            <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Medical Alerts</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patientInfo.allergies.map((allergy, index) => (
                      <span key={index} className="px-2 py-1 bg-red-900/40 text-red-200 text-xs rounded-full">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Chronic Conditions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patientInfo.chronicConditions.map((condition, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-900/40 text-orange-200 text-xs rounded-full">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Pill className="w-5 h-5 text-cyan-300" />
                Current Medications
              </h3>
              <div className="space-y-3">
                {patientInfo.currentMedications.map((medication, index) => (
                  <div key={index} className="text-sm border-l-4 border-cyan-400/40 pl-3 text-gray-200">
                    {medication}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <>
            {/* Search and Filter Bar */}
            <div className="rounded-xl shadow-lg p-6 mb-6 backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search records, notes, or conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-white/20 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-white/20 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  >
                    <option value="all">All Types</option>
                    <option value="physical">Physical Exam</option>
                    <option value="laboratory">Laboratory</option>
                    <option value="consultation">Consultation</option>
                    <option value="imaging">Imaging</option>
                    <option value="screening">Screening</option>
                  </select>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Advanced Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Records Grid */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="rounded-xl shadow-lg border border-white/20 hover:shadow-2xl transition-shadow backdrop-blur-md bg-white/10">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(report.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-white drop-shadow">{report.title}</h3>
                          <p className="text-sm text-gray-300">{report.type} • {report.doctor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <p className="text-gray-200 text-sm mb-3">{report.summary}</p>
                        </div>

                        {/* Clinical Notes */}
                        <div className="rounded-lg p-3 mb-4 bg-cyan-900/30 border border-cyan-400/20">
                          <h4 className="text-sm font-medium text-cyan-200 mb-2">Clinical Notes:</h4>
                          <p className="text-sm text-cyan-100">{report.notes}</p>
                          {report.followUp && (
                            <div className="mt-2 pt-2 border-t border-cyan-400/20">
                              <p className="text-xs text-cyan-200">
                                <strong>Follow-up:</strong> {report.followUp}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {/* Key Results */}
                        <div className="rounded-lg p-3 mb-4 bg-black/30 border border-white/20">
                          <h4 className="text-sm font-medium text-white mb-2">Key Results:</h4>
                          <div className="space-y-1">
                            {Object.entries(report.results).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-xs">
                                <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="text-white font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Attachments */}
                        {report.attachments && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-white mb-2">Attachments:</h4>
                            <div className="space-y-1">
                              {report.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-cyan-200 hover:text-cyan-400 cursor-pointer">
                                  <FileText className="w-3 h-3" />
                                  {attachment}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-white/20">
                      <button 
                        onClick={() => setSelectedRecord(report)}
                        className="px-4 py-2 bg-cyan-600/80 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 text-sm shadow"
                      >
                        <Eye className="w-4 h-4" />
                        Full Details
                      </button>
                      <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-sm shadow">
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-sm shadow">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Detailed Record Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-lg bg-white/10 border border-white/20">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white drop-shadow">{selectedRecord.title}</h2>
                    <p className="text-gray-300 mt-1">{selectedRecord.type} • {selectedRecord.doctor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedRecord.priority)}`}>
                        {selectedRecord.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Clinical Summary</h3>
                      <p className="text-gray-200">{selectedRecord.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-200 mb-3">Clinical Notes</h3>
                      <div className="rounded-lg p-4 bg-cyan-900/30 border border-cyan-400/20">
                        <p className="text-cyan-100">{selectedRecord.notes}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-200 mb-3">Follow-up Plan</h3>
                      <div className="rounded-lg p-4 bg-green-900/30 border border-green-400/20">
                        <p className="text-green-100 font-medium">{selectedRecord.followUp}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Complete Results</h3>
                      <div className="rounded-lg p-4 bg-black/30 border border-white/20">
                        <div className="space-y-3">
                          {Object.entries(selectedRecord.results).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
                              <span className="text-gray-300 font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <span className="text-white font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedRecord.attachments && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Attachments</h3>
                        <div className="space-y-2">
                          {selectedRecord.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-white/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-cyan-200" />
                                <span className="text-sm text-cyan-100">{attachment}</span>
                              </div>
                              <button className="text-cyan-300 hover:text-cyan-400 text-sm">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-white/20">
                  <button className="px-4 py-2 bg-cyan-600/80 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 shadow">
                    <Edit3 className="w-4 h-4" />
                    Edit Record
                  </button>
                  <button className="px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow">
                    <Download className="w-4 h-4" />
                    Export Full Report
                  </button>
                  <button 
                    onClick={() => setSelectedRecord(null)}
                    className="px-6 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="rounded-xl shadow-lg p-12 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No records found</h3>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatientRecords;