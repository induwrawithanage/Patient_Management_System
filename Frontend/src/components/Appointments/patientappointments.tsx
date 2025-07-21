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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">HealthCare Appointments</h1>
              <p className="text-gray-600">Book and manage your medical appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'book'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Appointments
            </button>
          </div>
        </div>

        {activeTab === 'book' && (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search doctors or specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
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
                      <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      <span>{doctor.rating} • {doctor.experience}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{doctor.phone}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-green-600">{doctor.consultationFee}</span>
                      <span className="text-gray-500 text-sm ml-1">consultation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Appointment Booking */}
            {selectedDoctor && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Book Appointment with {selectedDoctor.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(null);
                      setSelectedDate('');
                      setSelectedTime('');
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">My Appointments</h3>
              <button
                onClick={() => setActiveTab('book')}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </button>
            </div>
            
            <div className="space-y-4">
              {myAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                        <p className="text-blue-600 text-sm">{appointment.specialty}</p>
                        <p className="text-gray-600 text-sm">{appointment.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
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
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled</p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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