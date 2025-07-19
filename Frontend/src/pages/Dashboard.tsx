import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaUserMd, FaEnvelope, FaPhone, FaHospital, FaIdCard, FaUserShield } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { CheckCircle, Stethoscope, Users, Calendar } from 'lucide-react'
import BackgroundDecorations from '../components/PatientProfile/BackgroundDecorations'

interface DoctorUser {
  email: string;
  role: string;
  userId: string;
  fullname: string;
  phone: string;
  hospital: string;
  national_id: string;
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

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
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
    fetchDoctorInfo();
  }, []);

  const infoItems = [
    { icon: FaUserShield, label: 'Role', value: user?.role },
    { icon: FaEnvelope, label: 'Email', value: user?.email },
    { icon: FaPhone, label: 'Phone', value: user?.phone !== 'undefined' ? user?.phone : 'N/A' },
    { icon: FaHospital, label: 'Hospital', value: user?.hospital !== 'undefined' ? user?.hospital : 'N/A' },
    { icon: FaIdCard, label: 'National ID', value: user?.national_id !== 'undefined' ? user?.national_id : 'N/A' },
    { icon: FaIdCard, label: 'User ID', value: user?.userId },
  ];

  // Sample stats data for decorative purposes
  const stats = [
    { icon: Stethoscope, label: 'Patients Treated', value: '1,234', color: 'text-green-400' },
    { icon: Users, label: 'Active Patients', value: '87', color: 'text-blue-400' },
    { icon: Calendar, label: 'Appointments Today', value: '12', color: 'text-purple-400' },
  ];

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Patients', to: '/patient-profile' },
    { label: 'Appointments', to: '/appointments' },
    { label: 'Reports', to: '/reports' },
    { label: 'Settings', to: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/patient-profile" 
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors duration-200 border border-gray-700 hover:border-gray-600"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Patient Profile</h2>
            <p className="text-gray-400">View and manage patient information</p>
          </Link>
          
          {/* Add more dashboard cards here */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-2">Appointments</h2>
            <p className="text-gray-400">Manage appointments and schedules</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-2">Reports</h2>
            <p className="text-gray-400">View medical reports and analytics</p>
          </div>
        </div>
      </div>
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/80 pointer-events-none z-0" />
      <BackgroundDecorations />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.15)_0%,transparent_70%)] animate-pulse z-0" />
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2v-4h4v-2h-4V0h-2zM6 34v4h4v-4h2v-4h-2v-4H6v4H2v2h4zm0-30v4H2v2h4v4h4V6h2V2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px',
           }} 
      />
      {/* Navbar (unchanged) */}
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
      <div className="max-w-4xl mx-auto p-8 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-8 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-400"></div>
          </div>
        ) : error ? (
          <motion.div 
            className="bg-red-900/80 text-white p-4 rounded-lg text-center mb-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        ) : user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-8">
                <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
                  <div className="relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center border-4 border-white/20 shadow-xl">
                      <FaUserMd className="text-5xl lg:text-6xl text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-left flex-1">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{user.fullname}</h2>
                  <div className="flex flex-col items-center lg:items-start space-y-2 text-gray-300 mb-4">
                    {infoItems.map((item, index) => (
                      <div key={item.label} className="flex items-center space-x-2">
                        <item.icon size={18} className="text-gray-300" />
                        <span className="text-lg">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    <FaUserShield size={16} className="mr-2" />
                    <span className="font-medium">Active Doctor</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Stats Overview Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-white mb-6">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <stat.icon size={20} className={stat.color} />
                      </div>
                      <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                    </div>
                    <p className={`font-semibold text-xl ${stat.color}`}>{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-400 to-transparent h-[2px] w-4/5 blur-sm" />
      <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-400 to-transparent h-px w-4/5" />
      <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[5px] w-2/5 blur-sm" />
      <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-2/5" />
    </div>
  );
}

export default Dashboard