import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/FogetPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
