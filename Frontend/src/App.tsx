import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/FogetPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import PatientProfilePage from './pages/PatientProfile'
import Homepage from './pages/Homepage'
import PatientProfile from './pages/PatientProfile';
import SignupPatient from './pages/SignupPatient'
import AddRecordForm from './pages/record';
import Appointment from './pages/Appointment';
import NewPatient from './pages/NewPatient';
import Dashboardnew from './pages/Dashboard'
import MedicalRecordDetail from './components/NewPatient/MedicalRecordDetail'
import ReportWrapper from './pages/reports'
import AddPatient from './pages/AddPatient'
function App() {


  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/records" element={<AddRecordForm/>} />
        {/* Define other routes here */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboardnew />} />
        <Route path="/patient-profile" element={<PatientProfilePage />} />
        <Route path="/patient-profile/:patientId" element={<PatientProfilePage />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/patient-profile/:patientId" element={<PatientProfile />} />
        <Route path="/signup-patient" element={<SignupPatient />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/reports" element={<ReportWrapper />} />
        <Route path="/new-patient" element={<NewPatient />} />
        <Route path="/medical-record/:id" element={<MedicalRecordDetail />} />
        <Route path="/addpatient" element={<AddPatient />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
