import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  employer:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployerProfile",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  salary: { type: Number },
  location: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;