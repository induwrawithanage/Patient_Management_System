import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  reportType: { type: String, required: true }, 
  reportDate: { type: Date, default: Date.now },
  reportDetails: { type: String, default: '' },
  notes: { type: String, default: '' }, 
});

export default mongoose.model('Report', reportSchema);