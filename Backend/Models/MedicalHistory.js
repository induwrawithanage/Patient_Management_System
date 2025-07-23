import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({

    identifications: { type: String, default: '' },
    prescriptions: { type: String, default: '' },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    riskLevel: { type: String, default: 'undefined' },
    patient_id: { type:String, required: true },
    doctor_id:{ type:String, required: true },

});
export default mongoose.model('MedicalHistory', medicalHistorySchema);