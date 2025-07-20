import mongoose, { now } from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required : true },
    identifications: { type: String, default: '' },
    prescriptions: { type: String, default: '' },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    riskLevel: { type: String, default: 'undefined' },

});
export default mongoose.model('MedicalHistory', medicalHistorySchema);