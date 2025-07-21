import mongoose from 'mongoose';

const apoinmentSchema = new mongoose.Schema({
patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
appointmentDate: { type: Date, required: true },
appointmentTime: { type: String, required: true },
status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
notes: { type: String, default: '' },
});

export default mongoose.model('Appointment', appointmentSchema);