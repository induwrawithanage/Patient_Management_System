
import  Newdoctor from "./Dashboard";
import NewPatient from "./NewPatient";
import React from 'react';
export default function ReportWrapper() {
  const isDoctor = localStorage.getItem('isDoctor') === 'true';

  return (
    <>
      {isDoctor ? < Newdoctor/> : <NewPatient />}
    </>
  );
}