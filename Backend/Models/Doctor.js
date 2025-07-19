import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String,default:'patient'}, // Default role for doctors
});

export default mongoose.model('Doctor', DoctorSchema);