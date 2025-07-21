import PatientAppoinmnets from '../components/Appointments/patientappointments';
import DoctorAppointments from '../components/Appointments/doctorappointments';
import React from 'react';
export default function AppointmentWrapper() {
  const isDoctor = localStorage.getItem('isDoctor') === 'true';

  return (
    <>
      {isDoctor ? <DoctorAppointments /> : <PatientAppoinmnets />}
    </>
  );
}