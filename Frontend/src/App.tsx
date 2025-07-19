import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/FogetPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import PatientProfilePage from './pages/PatientProfile'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-profile" element={<PatientProfilePage />} />
        <Route path="/patient-profile/:patientId" element={<PatientProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
