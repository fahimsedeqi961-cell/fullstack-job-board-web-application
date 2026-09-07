import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied", "Reviewed", "Interview", "Rejected", "Hired"],
    default: "Applied"
  },

}, { timestamps: true });


applicationSchema.index({ jobId: 1, appication: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;