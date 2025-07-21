import DoctorPatientRecords from '../components/Reports/doctorreport';
import PatientHealthRecords from '../components/Reports/patientreport';    
import React from 'react';
export default function ReportWrapper() {
  const isDoctor = localStorage.getItem('isDoctor') === 'true';

  return (
    <>
      {isDoctor ? <DoctorPatientRecords /> : <PatientHealthRecords />}
    </>
  );
}