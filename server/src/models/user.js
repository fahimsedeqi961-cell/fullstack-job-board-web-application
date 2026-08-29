import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    emun: ["jobseeker", "employer", "admin"],
    default: "jobseeker",
  },
  refreshToken: String,
  refreshTokenExpires: Date
}, { timestamps: true })


const User = mongoose.model("User", userSchema);
export default User;