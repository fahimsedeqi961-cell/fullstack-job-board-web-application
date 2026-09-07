import mongoose from "mongoose"


const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: ""
  },
  resumeUrl: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    default: ""
  },
  experienceLevel: {
    type: String,
    enum: ["entry", "mid", "senior"]
  },
  savedJobs: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      }
    ],
    default: []
  },
}, { timestamps: true });

const JobSeekerProfile = mongoose.model("JobSeekerProfile", jobSeekerSchema);
export default JobSeekerProfile;