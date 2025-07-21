import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  value: { type: String, required: true },
  recordedAt: { type: Date, default: Date.now }
}, { _id: false });

const patientStateSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  bloodPressures: { type: [metricSchema], default: [] },
  heartRates:     { type: [metricSchema], default: [] },
  glucoseLevels:  { type: [metricSchema], default: [] },
  oxygenLevels:   { type: [metricSchema], default: [] }
});

export default mongoose.model('PatientState', patientStateSchema);
