import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';

type PatientDetails = {
  _id: string;
  fullname: string;
  phone: string;
  email: string;
  national_id: string;
  age?: string;
  bloodgroup?: string;
  address?: string;
};

const useQuery = () => new URLSearchParams(useLocation().search);

function PatientInfo() {
  const query = useQuery();
  const id = query.get('id');
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/getinformation?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // or use context if you store it differently
          },
        });
        setPatient(response.data);
      } catch (err) {
        setError('Failed to fetch patient information');
        console.error(err);
      }
    };

    if (id) fetchPatient();
  }, [id]);

  return (
    <Box className="min-h-screen bg-gray-900 text-white p-8">
      {error && <Typography color="error">{error}</Typography>}
      {patient ? (
        <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: '#121212' }}>
          <Typography variant="h5" mb={2}>Patient Details</Typography>
          <Typography><strong>Name:</strong> {patient.fullname}</Typography>
          <Typography><strong>Phone:</strong> {patient.phone}</Typography>
          <Typography><strong>Email:</strong> {patient.email}</Typography>
          <Typography><strong>NIC:</strong> {patient.national_id}</Typography>
          <Typography><strong>Age:</strong> {patient.age || 'N/A'}</Typography>
          <Typography><strong>Blood Group:</strong> {patient.bloodgroup || 'N/A'}</Typography>
          <Typography><strong>Address:</strong> {patient.address || 'N/A'}</Typography>
        </Paper>
      ) : (
        !error && <Typography>Loading patient info...</Typography>
      )}
    </Box>
  );
}

export default PatientInfo;
