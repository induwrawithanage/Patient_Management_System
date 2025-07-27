// import { useState } from "react";
// import DashboardNavbar from '../components/DashboardNavbar';
// import { TextField, Button, Paper, Typography, Box, Chip } from '@mui/material';

// type Patient = {
//   id: string;
//   name: string;
//   age: number;
//   contact: string;
// };

// const dummyPatients: Patient[] = [
//   { id: "1", name: "John Doe", age: 45, contact: "0712345678" },
//   { id: "2", name: "Jane Smith", age: 32, contact: "0723456789" },
//   { id: "3", name: "Malith Kariyawasam", age: 28, contact: "0759876543" },
// ];

// function AddPatient() {
//   const [search, setSearch] = useState("");
//   const [availablePatients, setAvailablePatients] = useState<Patient[]>(dummyPatients);
//   const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);

//   const filteredPatients = availablePatients.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleAdd = (patient: Patient) => {
//     setSelectedPatients([...selectedPatients, patient]);
//     setAvailablePatients(availablePatients.filter((p) => p.id !== patient.id));
//   };

//   const handleRemove = (patient: Patient) => {
//     setAvailablePatients([...availablePatients, patient]);
//     setSelectedPatients(selectedPatients.filter((p) => p.id !== patient.id));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-[#10131a] to-[#181c24] relative overflow-hidden">
//       <DashboardNavbar menuOpen={false} setMenuOpen={() => {}} />
//       <Box sx={{ maxWidth: 900, mx: 'auto', py: 8, px: { xs: 2, md: 4 } }}>
//         <Paper elevation={8} sx={{ borderRadius: 6, p: { xs: 3, md: 6 }, background: 'rgba(10,12,24,0.92)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.7)', border: '1.5px solid #222b3a' }}>
//           <Typography variant="h4" fontWeight={700} color="#00eaff" mb={4} sx={{ textShadow: '0 2px 8px #00eaff44' }}>
//             Add Patient
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Search patients..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             sx={{ mb: 4, input: { color: '#e0f7fa', background: '#181c24' }, label: { color: '#00eaff' }, '& .MuiOutlinedInput-root': { background: '#181c24', '& fieldset': { borderColor: '#00eaff' }, '&:hover fieldset': { borderColor: '#00eaff' } } }}
//             InputLabelProps={{ style: { color: '#00eaff' } }}
//           />
//           <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
//             {/* Available Patients */}
//             <Paper elevation={4} sx={{ borderRadius: 4, p: 3, background: 'rgba(0, 40, 60, 0.85)', border: '1.5px solid #00eaff', mb: 2, boxShadow: '0 2px 12px #00eaff22' }}>
//               <Typography variant="h6" color="#00eaff" fontWeight={600} mb={2}>Available Patients</Typography>
//               <Box display="flex" flexDirection="column" gap={2}>
//                 {filteredPatients.length > 0 ? (
//                   filteredPatients.map((patient) => (
//                     <Paper key={patient.id} elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(0, 40, 60, 0.95)', boxShadow: '0 2px 8px #00eaff33' }}>
//                       <Box>
//                         <Typography fontWeight={600} color="#e0f7fa">{patient.name}</Typography>
//                         <Typography variant="body2" color="#80deea">Age: {patient.age}, Contact: {patient.contact}</Typography>
//                       </Box>
//                       <Button variant="contained" color="info" onClick={() => handleAdd(patient)} sx={{ fontWeight: 700, borderRadius: 2, boxShadow: '0 2px 8px #00eaff55' }}>Add</Button>
//                     </Paper>
//                   ))
//                 ) : (
//                   <Typography color="#b2ebf2">No matching patients found.</Typography>
//                 )}
//               </Box>
//             </Paper>
//             {/* Selected Patients */}
//             <Paper elevation={4} sx={{ borderRadius: 4, p: 3, background: 'rgba(0, 60, 40, 0.85)', border: '1.5px solid #00ffb7', mb: 2, boxShadow: '0 2px 12px #00ffb733' }}>
//               <Typography variant="h6" color="#00ffb7" fontWeight={600} mb={2}>Selected Patients</Typography>
//               <Box display="flex" flexDirection="column" gap={2}>
//                 {selectedPatients.length > 0 ? (
//                   selectedPatients.map((patient) => (
//                     <Paper key={patient.id} elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(0, 60, 40, 0.95)', boxShadow: '0 2px 8px #00ffb733' }}>
//                       <Box>
//                         <Typography fontWeight={600} color="#e0fff7">{patient.name}</Typography>
//                         <Typography variant="body2" color="#80ffea">Age: {patient.age}, Contact: {patient.contact}</Typography>
//                       </Box>
//                       <Button variant="contained" color="success" onClick={() => handleRemove(patient)} sx={{ fontWeight: 700, borderRadius: 2, boxShadow: '0 2px 8px #00ffb755' }}>Remove</Button>
//                     </Paper>
//                   ))
//                 ) : (
//                   <Typography color="#b2f2e5">No patients selected.</Typography>
//                 )}
//               </Box>
//             </Paper>
//           </Box>
//         </Paper>
//       </Box>
//     </div>
//   );
// }

// export default AddPatient;

import { useState, useEffect } from "react";
import DashboardNavbar from '../components/DashboardNavbar';
import { TextField, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Define a simplified Patient type
type RawPatient = {
  _id: string;
  fullname: string;
  phone: string;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function AddPatient() {
  const [search, setSearch] = useState("");
  const [availablePatients, setAvailablePatients] = useState<RawPatient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const query = useQuery();
  const patientId = query.get('id');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/doctor/searchpatient?id=${search}`);
        const patients = Array.isArray(response.data) ? response.data : [response.data];
        setAvailablePatients(patients);
        setError(null);
      } catch (err) {
        setError('Failed to fetch patients. Please try again.');
        console.error(err);
      }
    };

    if (search || patientId) {
      fetchPatients();
    }
  }, [search, patientId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10131a] to-[#181c24] relative overflow-hidden">
      <DashboardNavbar menuOpen={false} setMenuOpen={() => {}} />
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 8, px: { xs: 2, md: 4 } }}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            background: 'rgba(10,12,24,0.92)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.7)',
            border: '1.5px solid #222b3a',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="#00eaff"
            mb={4}
            sx={{ textShadow: '0 2px 8px #00eaff44' }}
          >
            Search Patients
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            variant="outlined"
            label="Search patient by ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 4,
              input: { color: '#e0f7fa', background: '#181c24' },
              label: { color: '#00eaff' },
              '& .MuiOutlinedInput-root': {
                background: '#181c24',
                '& fieldset': { borderColor: '#00eaff' },
                '&:hover fieldset': { borderColor: '#00eaff' },
              },
            }}
            InputLabelProps={{ style: { color: '#00eaff' } }}
          />

          {/* Display Matching Patients */}
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: 3,
              background: 'rgba(0, 40, 60, 0.85)',
              border: '1.5px solid #00eaff',
              mb: 2,
              boxShadow: '0 2px 12px #00eaff22',
            }}
          >
            <Typography
              variant="h6"
              color="#00eaff"
              fontWeight={600}
              mb={2}
            >
              Matching Patients
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {availablePatients.length > 0 ? (
                availablePatients.map((p) => (
                  <Paper
                    key={p._id}
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(0, 40, 60, 0.95)',
                      boxShadow: '0 2px 8px #00eaff33',
                    }}
                  >
                    <Typography fontWeight={600} color="#e0f7fa">
                      {p.fullname}
                    </Typography>
                    <Typography variant="body2" color="#80deea">
                      Phone: {p.phone}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography color="#b2ebf2">
                  No matching patients found.
                </Typography>
              )}
            </Box>
          </Paper>
        </Paper>
      </Box>
    </div>
  );
}

export default AddPatient;
