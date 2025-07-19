import { useParams } from 'react-router-dom';
import PatientProfile from '../components/PatientProfile/PatientProfile';

const PatientProfilePage = () => {
  const { patientId } = useParams<{ patientId?: string }>();
  
  return <PatientProfile patientId={patientId} />;
};

export default PatientProfilePage;