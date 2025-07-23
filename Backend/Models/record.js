import mongoose from "mongoose";
const parametersSchema = new mongoose.Schema({
  record_id: { type: String, required: true }, 
  subtopics:{type:String,required:true},
  date: { type: Date, default: Date.now },
  note:{type:String,default:"undefined"},
  special_note:{type:String,default:"undefined"},
  treatment:{type:String,default:"undefined"},
  patient_id:{type: String, default:"undefined"},
})

export default mongoose.model("Record", parametersSchema);