import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Simple modal component
function EditDetailsModal({ open, onClose, user, onSave, loading }) {
  const [form, setForm] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    hospital: user?.hospital || '',
    national_id: user?.national_id || '',
    degree: user?.degree || '',
    specialization: user?.specialization || '',
    description: user?.description || '',
  });

  useEffect(() => {
    setForm({
      fullname: user?.fullname || '',
      email: user?.email || '',
      phone: user?.phone || '',
      hospital: user?.hospital || '',
      national_id: user?.national_id || '',
      degree: user?.degree || '',
      specialization: user?.specialization || '',
      description: user?.description || '',
    });
  }, [user, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
              <input name="fullname" value={form.fullname} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" required />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" required type="email" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Hospital</label>
              <input name="hospital" value={form.hospital} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">National ID</label>
              <input name="national_id" value={form.national_id} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Degree</label>
              <input name="degree" value={form.degree} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Specialization</label>
              <input name="specialization" value={form.specialization} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" rows={2} />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { FaUserMd, FaEnvelope, FaPhone, FaHospital, FaIdCard, FaUserShield, FaGraduationCap, FaBell, FaSearch, FaCog } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { CheckCircle, Stethoscope, Users, Calendar, TrendingUp, Activity, Award, Clock, ArrowRight, Star, Heart } from 'lucide-react'

// Mock BackgroundDecorations component since it's not available
const BackgroundDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated gradient orbs */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
);

interface DoctorUser {
  email: string;
  role: string;
  userId: string;
  fullname: string;
  phone: string;
  hospital: string;
  national_id: string;
  degree?: string;
  specialization?: string;
  description?: string;
  iat?: number;
  exp?: number;
}


function Dashboard() {
  const location = useLocation();
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Reusable fetch function
  const fetchDoctorInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please login.');
        setLoading(false);
        return;
      }
      const res = await fetch('http://localhost:3000/doctor/getinformation', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        setError(data.message || 'Failed to fetch user info');
      }
    } catch (err) {
      setError('Error fetching user info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
    // eslint-disable-next-line
  }, []);

  const infoItems = [
    { icon: FaUserShield, label: 'Role', value: user?.role, color: 'text-purple-400' },
    { icon: FaEnvelope, label: 'Email', value: user?.email, color: 'text-blue-400' },
    { icon: FaPhone, label: 'Phone', value: user?.phone && user?.phone !== 'undefined' ? user?.phone : 'N/A', color: 'text-green-400' },
    { icon: FaHospital, label: 'Hospital', value: user?.hospital && user?.hospital !== 'undefined' ? user?.hospital : 'N/A', color: 'text-red-400' },
    { icon: FaIdCard, label: 'National ID', value: user?.national_id && user?.national_id !== 'undefined' ? user?.national_id : 'N/A', color: 'text-yellow-400' },
    { icon: FaIdCard, label: 'User ID', value: user?.userId, color: 'text-indigo-400' },
    { icon: FaGraduationCap, label: 'Degree', value: user?.degree && user?.degree !== 'undefined' ? user?.degree : 'N/A', color: 'text-pink-400' },
    { icon: FaUserMd, label: 'Specialization', value: user?.specialization && user?.specialization !== 'undefined' ? user?.specialization : 'N/A', color: 'text-teal-400' },
    { icon: FaIdCard, label: 'Description', value: user?.description && user?.description !== 'undefined' ? user?.description : 'N/A', color: 'text-gray-400' },
  ];

  // Enhanced stats with more visual appeal
  const stats = [
    { 
      icon: Stethoscope, 
      label: 'Patients Treated', 
      value: '1,847', 
      change: '+12%',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgGradient: 'bg-gradient-to-br from-emerald-500/10 to-teal-600/10'
    },
    { 
      icon: Users, 
      label: 'Active Patients', 
      value: '124', 
      change: '+8%',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      bgGradient: 'bg-gradient-to-br from-blue-500/10 to-indigo-600/10'
    },
    { 
      icon: Calendar, 
      label: 'Appointments Today', 
      value: '16', 
      change: '+3',
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      bgGradient: 'bg-gradient-to-br from-purple-500/10 to-violet-600/10'
    },
    { 
      icon: TrendingUp, 
      label: 'Success Rate', 
      value: '98.5%', 
      change: '+0.2%',
      color: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-400',
      bgGradient: 'bg-gradient-to-br from-pink-500/10 to-rose-600/10'
    },
  ];

  const quickActions = [
    { icon: Calendar, label: 'Schedule Appointment', color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700' },
    { icon: Users, label: 'View Patients', color: 'from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700' },
    { icon: Activity, label: 'Health Reports', color: 'from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700' },
    { icon: FaCog, label: 'Settings', color: 'from-gray-500 to-gray-600', hoverColor: 'hover:from-gray-600 hover:to-gray-700' },
  ];

  const recentActivities = [
    { action: 'Completed surgery', patient: 'John Doe', time: '2 hours ago', icon: Activity, color: 'text-green-400' },
    { action: 'New appointment', patient: 'Jane Smith', time: '4 hours ago', icon: Calendar, color: 'text-blue-400' },
    { action: 'Updated patient record', patient: 'Mike Johnson', time: '1 day ago', icon: Users, color: 'text-purple-400' },
  ];

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Patients', to: '/patient-profile' },
    { label: 'Appointments', to: '/appointments' },
    { label: 'Reports', to: '/reports' },
    { label: 'Settings', to: '/settings' },
    { label: 'Records', to: '/records' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden dark:bg-black">
      <BackgroundDecorations />
      {/* Provided Navbar with dark theme support */}
      <header className="border-b border-gray-900 bg-white/10 dark:bg-black/40 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="MediSync Logo"
              className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
            />
            <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
          </div>
          <button
            className="md:hidden flex items-center px-3 py-2 rounded text-gray-200 hover:bg-white/10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          {/* Desktop menu with NavLink */}
          <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? item.label === 'Patients'
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                        : 'text-white bg-white/10 border border-white/20 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Mobile dropdown menu with NavLink */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-800 px-4 py-2 flex flex-col space-y-2 shadow-xl z-50">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? item.label === 'Patients'
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                        : 'text-white bg-white/10 border border-white/20 shadow-lg'
                      : 'text-gray-200 hover:bg-white/10'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-6 lg:p-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user?.fullname ?? ""}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Manage your patients, track appointments, and maintain excellence in healthcare delivery.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Stethoscope className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 text-white p-6 rounded-2xl text-center mb-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-sm">!</span>
              </div>
              {error}
            </div>
          </motion.div>
        ) : user ? (
          <>
            {/* Enhanced Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden mb-8 group hover:from-white/15 hover:to-white/10 transition-all duration-500"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Edit Details Button */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="button"
                  onClick={() => setEditOpen(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" /></svg>
                  <span>Edit Details</span>
                </button>
              </div>
      {/* Edit Details Modal */}
      <EditDetailsModal
        open={editOpen}
        onClose={() => { setEditOpen(false); setEditError(""); }}
        user={user}
        loading={editLoading}
        onSave={async (form: {
          fullname: string;
          email: string;
          phone: string;
          hospital: string;
          national_id: string;
          degree: string;
          specialization: string;
          description: string;
        }) => {
          setEditLoading(true);
          setEditError("");
          try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3000/doctor/updateinformation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.success) {
              setEditOpen(false);
              await fetchDoctorInfo(); // Always fetch latest info after update
            } else {
              setEditError(data.message || 'Failed to update details');
            }
          } catch (err) {
            setEditError('Error updating details');
          } finally {
            setEditLoading(false);
          }
        }}
      />

              <div className="relative z-10">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  {/* Profile Image and Status */}
                  <div className="flex flex-col items-center lg:items-start space-y-4">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        <FaUserMd className="text-6xl text-white" />
                      </div>
                      <div className="absolute -bottom-3 -right-3 flex space-x-1">
                        <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center shadow-lg">
                          <CheckCircle size={16} className="text-white" />
                        </div>
                        <div className="w-8 h-8 bg-yellow-500 rounded-full border-4 border-white/20 flex items-center justify-center shadow-lg">
                          <Star size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-left">
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full border border-green-500/30 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span className="font-medium">Active • Online</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">Verified</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="lg:col-span-2">
                    <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {user.fullname}
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">{user.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {infoItems.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group/item"
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-600/20' : 
                                        item.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-600/20' :
                                        item.color === 'text-green-400' ? 'from-green-500/20 to-green-600/20' :
                                        item.color === 'text-red-400' ? 'from-red-500/20 to-red-600/20' :
                                        item.color === 'text-yellow-400' ? 'from-yellow-500/20 to-yellow-600/20' :
                                        item.color === 'text-pink-400' ? 'from-pink-500/20 to-pink-600/20' :
                                        item.color === 'text-teal-400' ? 'from-teal-500/20 to-teal-600/20' :
                                        'from-indigo-500/20 to-indigo-600/20'
                                      } group-hover/item:scale-110 transition-transform duration-200`}>
                            <item.icon size={18} className={`${item.color} transition-colors duration-200`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-400 text-sm">{item.label}</p>
                            <p className="text-white truncate font-medium">{item.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`${stat.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                    <span className={`text-sm font-medium ${stat.textColor} bg-white/10 px-2 py-1 rounded-full`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions and Recent Activity Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-white">Quick Actions</h3>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 bg-gradient-to-r ${action.color} ${action.hoverColor} rounded-xl text-white font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl`}
                    >
                      <action.icon className="w-5 h-5" />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className={`p-2 rounded-lg ${activity.color === 'text-green-400' ? 'bg-green-500/20' : 
                                     activity.color === 'text-blue-400' ? 'bg-blue-500/20' : 
                                     'bg-purple-500/20'}`}>
                        <activity.icon size={16} className={activity.color} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.patient}</p>
                        <div className="flex items-center mt-1">
                          <Clock size={12} className="text-gray-500 mr-1" />
                          <span className="text-gray-500 text-xs">{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;