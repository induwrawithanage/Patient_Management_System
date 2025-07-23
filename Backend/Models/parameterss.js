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

<<<<<<< HEAD
export default mongoose.model("Parameters", parametersSchema);
=======
export default mongoose.model("Parameters", parametersSchema);
>>>>>>> 05c1002feccfd193ec62384bce1036f11e03f365
