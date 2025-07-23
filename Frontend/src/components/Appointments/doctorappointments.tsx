import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Check, X, AlertCircle, Search, Filter, Plus, Edit3, FileText, Video } from 'lucide-react';

const DoctorAppointmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddAvailability, setShowAddAvailability] = useState(false);

  // Mock doctor profile
  const doctorProfile = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    clinic: "Heart Care Medical Center",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  };

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      patientAge: 45,
      patientPhone: "+1 (555) 123-4567",
      patientEmail: "john.smith@email.com",
      date: "2025-07-20",
      time: "09:00",
      duration: 30,
      type: "Consultation",
      status: "confirmed",
      notes: "Regular checkup for blood pressure monitoring",
      symptoms: "Chest discomfort, irregular heartbeat",
      priority: "medium"
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      patientAge: 32,
      patientPhone: "+1 (555) 234-5678",
      patientEmail: "maria.garcia@email.com",
      date: "2025-07-20",
      time: "10:30",
      duration: 45,
      type: "Follow-up",
      status: "confirmed",
      notes: "Post-surgery follow-up",
      symptoms: "Recovery check after cardiac procedure",
      priority: "high"
    },
    {
      id: 3,
      patientName: "Robert Wilson",
      patientAge: 58,
      patientPhone: "+1 (555) 345-6789",
      patientEmail: "robert.wilson@email.com",
      date: "2025-07-20",
      time: "14:00",
      duration: 30,
      type: "Consultation",
      status: "pending",
      notes: "New patient consultation",
      symptoms: "Family history of heart disease, seeking preventive care",
      priority: "low"
    },
    {
      id: 4,
      patientName: "Lisa Thompson",
      patientAge: 41,
      patientPhone: "+1 (555) 456-7890",
      patientEmail: "lisa.thompson@email.com",
      date: "2025-07-21",
      time: "11:00",
      duration: 60,
      type: "Treatment",
      status: "confirmed",
      notes: "Cardiac stress test scheduled",
      symptoms: "Shortness of breath during exercise",
      priority: "high"
    },
    {
      id: 5,
      patientName: "David Brown",
      patientAge: 29,
      patientPhone: "+1 (555) 567-8901",
      patientEmail: "david.brown@email.com",
      date: "2025-07-21",
      time: "15:30",
      duration: 30,
      type: "Consultation",
      status: "cancelled",
      notes: "Patient requested reschedule",
      symptoms: "Mild chest pain",
      priority: "low"
    }
  ];

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
  };

  const getAppointmentsByDate = (targetDate) => {
    return appointments.filter(apt => apt.date === targetDate);
  };

  const getTodayAppointments = () => {
    return getAppointmentsByDate('2025-07-20');
  };

  const getUpcomingAppointments = () => {
    return appointments.filter(apt => new Date(apt.date) > new Date('2025-07-20'));
  };

  const getAllAppointments = () => {
    return appointments;
  };

  const getFilteredAppointments = () => {
    let filteredAppointments = [];
    
    switch(activeTab) {
      case 'today':
        filteredAppointments = getTodayAppointments();
        break;
      case 'upcoming':
        filteredAppointments = getUpcomingAppointments();
        break;
      case 'all':
        filteredAppointments = getAllAppointments();
        break;
      default:
        filteredAppointments = getAllAppointments();
    }

    // Apply search filter
    if (searchQuery) {
      filteredAppointments = filteredAppointments.filter(apt =>
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredAppointments = filteredAppointments.filter(apt => apt.status === statusFilter);
    }

    return filteredAppointments;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={doctorProfile.avatar}
                alt={doctorProfile.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white/20 shadow"
              />
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow">{doctorProfile.name}</h1>
                <p className="text-cyan-300 font-medium">{doctorProfile.specialty}</p>
                <p className="text-gray-300">{doctorProfile.clinic}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddAvailability(true)}
                className="bg-cyan-600/80 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center shadow"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Availability
              </button>
              <div className="bg-cyan-900/40 p-3 rounded-full">
                <Calendar className="h-8 w-8 text-cyan-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Today's Appointments</p>
                <p className="text-2xl font-bold text-white">{getTodayAppointments().length}</p>
              </div>
              <div className="bg-cyan-900/40 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-cyan-300" />
              </div>
            </div>
          </div>
          <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-green-400">
                  {appointments.filter(apt => apt.status === 'confirmed').length}
                </p>
              </div>
              <div className="bg-green-900/40 p-3 rounded-lg">
                <Check className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {appointments.filter(apt => apt.status === 'pending').length}
                </p>
              </div>
              <div className="bg-yellow-900/40 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="rounded-xl shadow-lg p-6 backdrop-blur-md bg-white/10 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-red-400">
                  {appointments.filter(apt => apt.priority === 'high').length}
                </p>
              </div>
              <div className="bg-red-900/40 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rounded-2xl shadow-xl mb-8 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors rounded-t-2xl
                ${activeTab === 'today'
                  ? 'text-cyan-300 bg-white/10 border-b-2 border-cyan-400 shadow-inner backdrop-blur-md'
                  : 'text-gray-400 hover:text-cyan-200 hover:bg-white/5'}
              `}
            >
              Today's Appointments
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors rounded-t-2xl
                ${activeTab === 'upcoming'
                  ? 'text-cyan-300 bg-white/10 border-b-2 border-cyan-400 shadow-inner backdrop-blur-md'
                  : 'text-gray-400 hover:text-cyan-200 hover:bg-white/5'}
              `}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors rounded-t-2xl
                ${activeTab === 'all'
                  ? 'text-cyan-300 bg-white/10 border-b-2 border-cyan-400 shadow-inner backdrop-blur-md'
                  : 'text-gray-400 hover:text-cyan-200 hover:bg-white/5'}
              `}
            >
              All Appointments
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, symptoms, or appointment type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {getFilteredAppointments().map(appointment => (
            <div
              key={appointment.id}
              className="rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow backdrop-blur-md bg-white/10 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="bg-cyan-900/40 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white drop-shadow">{appointment.patientName}</h3>
                    <p className="text-gray-300">Age: {appointment.patientAge}</p>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-cyan-300 mr-1" />
                      <span className="text-sm text-gray-300">{appointment.patientPhone}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 text-cyan-300 mr-1" />
                      <span className="text-sm text-gray-300">{appointment.patientEmail}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2">
                    <Calendar className="h-4 w-4 text-cyan-300 mr-1" />
                    <span className="text-sm text-gray-300">{appointment.date}</span>
                  </div>
                  <div className="flex items-center justify-end mb-2">
                    <Clock className="h-4 w-4 text-cyan-300 mr-1" />
                    <span className="text-sm text-gray-300">{appointment.time} ({appointment.duration} min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-200 mb-1">Appointment Type:</p>
                  <p className="text-cyan-300 font-medium">{appointment.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200 mb-1">Symptoms/Reason:</p>
                  <p className="text-gray-300 text-sm">{appointment.symptoms}</p>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-200 mb-1">Notes:</p>
                  <p className="text-gray-300 text-sm">{appointment.notes}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
                <button
                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center shadow"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Confirm
                </button>
                <button
                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  className="bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center shadow"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </button>
                <button
                  onClick={() => setSelectedAppointment(appointment)}
                  className="bg-cyan-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center shadow"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button className="bg-purple-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center shadow">
                  <Video className="h-4 w-4 mr-1" />
                  Video Call
                </button>
                <button className="bg-gray-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center shadow">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                </button>
              </div>
            </div>
          ))}
        </div>

        {getFilteredAppointments().length === 0 && (
          <div className="rounded-2xl shadow-xl p-12 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-white text-lg">No appointments found</p>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Add Availability Modal */}
        {showAddAvailability && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="rounded-2xl shadow-2xl max-w-md w-full p-6 backdrop-blur-lg bg-white/10 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Add Availability</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">End Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-cyan-600/80 text-white py-3 px-4 rounded-lg font-medium hover:bg-cyan-700 transition-colors shadow">
                  Add Availability
                </button>
                <button
                  onClick={() => setShowAddAvailability(false)}
                  className="flex-1 border border-white/30 py-3 px-4 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentDashboard;