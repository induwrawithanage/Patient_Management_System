import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String,default:'Doctor'},
  degree: { type: String, default: "undefined" },
  specialization: { type: String, default: "undefined" },
  description: { type: String, default: "undefined" },
  resetPasswordToken:{type: String, default:"undefined"},
  resetPasswordExpires:{type: String, default:"undefined"},
  national_id: { type: String, default: "undefined" },
  hospital: { type: String, default: "undefined" },
  connected_patient:{type: Array, default: []},
});

export default mongoose.model('Doctor', DoctorSchema);