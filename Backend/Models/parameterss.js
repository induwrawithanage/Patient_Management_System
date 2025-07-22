import mongoose from "mongoose";

const parametersSchema = new mongoose.Schema({
  patient_id: { type: String, required: true },
  weight: { type: String, default: "undefined" },
  height: { type: String, default: "undefined" },
  blood_sugar: { type: String, default: "undefined" },
  cholesterol_level: { type: String, default: "undefined" },
  Pressure_level: { type: String, default: "undefined" },
}, {
  timestamps: true  // ✅ This adds createdAt and updatedAt automatically
});

export default mongoose.model("Parameters", parametersSchema);