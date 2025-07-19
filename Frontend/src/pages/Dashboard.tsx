import { Link } from 'react-router-dom'

function Dashboard() {
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
    </div>
  )
}

export default Dashboard
