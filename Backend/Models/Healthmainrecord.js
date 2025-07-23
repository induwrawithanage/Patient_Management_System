import mongoose from "mongoose";
const parametersSchema = new mongoose.Schema({
 patient_id: { type: String, required: true },
 record_id: { type: String, required: true },
 date: { type: Date, default: Date.now },
 subject: { type: String, default: "undefined" }
});


export default mongoose.model("Healthmainrecord", parametersSchema);