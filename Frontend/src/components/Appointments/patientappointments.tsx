import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, Star, Filter, Search, Plus } from 'lucide-react';

 const HealthcareAppointments = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.8,
      experience: "15 years",
      location: "Medical Center A",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 123-4567",
      email: "s.johnson@healthcare.com",
      availability: ["09:00", "10:30", "14:00", "15:30", "16:45"],
      consultationFee: "$150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.9,
      experience: "12 years",
      location: "Skin Care Clinic",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 234-5678",
      email: "m.chen@healthcare.com",
      availability: ["08:30", "11:00", "13:30", "15:00", "17:00"],
      consultationFee: "$120"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.7,
      experience: "8 years",
      location: "Children's Hospital",
      image: "https://images.unsplash.com/photo-1594824804732-ca8db4ac6e1d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 345-6789",
      email: "e.rodriguez@healthcare.com",
      availability: ["09:30", "11:30", "14:30", "16:00"],
      consultationFee: "$100"
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      specialty: "Orthopedics",
      rating: 4.6,
      experience: "20 years",
      location: "Bone & Joint Center",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 456-7890",
      email: "r.williams@healthcare.com",
      availability: ["08:00", "10:00", "13:00", "15:30", "17:30"],
      consultationFee: "$180"
    }
  ];

  const myAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-07-25",
      time: "10:30",
      status: "confirmed",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2025-07-28",
      time: "14:00",
      status: "pending",
      type: "Consultation"
    }
  ];

  const specialties = ["all", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">HealthCare Appointments</h1>
              <p className="text-white">Book and manage your medical appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-900/40 p-3 rounded-full">
                <Calendar className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex border-b border-cyan-900/30">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors rounded-t-2xl ${
                activeTab === 'book'
                  ? 'text-cyan-300 border-b-2 border-cyan-400 bg-black/30'
                  : 'text-cyan-500 hover:text-cyan-300'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors rounded-t-2xl ${
                activeTab === 'appointments'
                  ? 'text-cyan-300 border-b-2 border-cyan-400 bg-black/30'
                  : 'text-cyan-500 hover:text-cyan-300'
              }`}
            >
              My Appointments
            </button>
          </div>
        </div>

        {activeTab === 'book' && (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search doctors or specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-cyan-700 bg-black/30 text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-cyan-400"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-cyan-700 bg-black/30 text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  className={`bg-black/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 cursor-pointer transition-all hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-cyan-400 bg-cyan-900/20' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-white">{doctor.name}</h3>
                      <p className="text-white font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-white">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>{doctor.rating} • {doctor.experience}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doctor.phone}</span>
                    </div>
                    <div className="pt-2 border-t border-cyan-900/30">
                      <span className="text-lg font-semibold text-white">{doctor.consultationFee}</span>
                      <span className="text-white text-sm ml-1">consultation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Appointment Booking */}
            {selectedDoctor && (
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Book Appointment with {selectedDoctor.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-cyan-700 bg-black/30 text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border border-cyan-700 bg-black/30 text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <option value="">Choose time slot</option>
                      {selectedDoctor.availability.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      setSelectedDate('');
                      setSelectedTime('');
                    }}
                    className="px-6 py-3 border border-cyan-700 text-cyan-200 rounded-lg font-medium hover:bg-cyan-900/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">My Appointments</h3>
              <button
                onClick={() => setActiveTab('book')}
                className="flex items-center bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </button>
            </div>
            
            <div className="space-y-4">
              {myAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-cyan-900/30 bg-black/30 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-cyan-900/40 p-3 rounded-full mr-4">
                        <User className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{appointment.doctor}</h4>
                        <p className="text-white text-sm">{appointment.specialty}</p>
                        <p className="text-white text-sm">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-white mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed'
                            ? 'bg-emerald-900/40 text-emerald-300'
                            : 'bg-yellow-900/40 text-yellow-300'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {myAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-cyan-700 mx-auto mb-4" />
                <p className="text-white">No appointments scheduled</p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareAppointments;