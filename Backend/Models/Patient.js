import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default:'patient'}, // Default role for doctors
  resetPasswordToken:{type: String, default:"undefined"},
  resetPasswordExpires:{type: String, default:"undefined"},
  national_id: { type: String, default: "undefined" },
  age: { type: String, default: "undefined" },
  bloodgroup: { type: String, default: "undefined" },
  address: { type: String, default: "undefined" },
  blockchainAddress: {type: String},
  sex:{type:String},
  coonected_doctors:{type: Array, default: []},
  recordHashes: [
    {
      blockchainTxHash: {
        type: String,
        default: "undefined"
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });


export default mongoose.model('Patient', patientSchema);