import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
