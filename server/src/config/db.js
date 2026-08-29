import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB successfully...");
  } catch (error) {
    console.log("Database connectin failed ", error.message);
    process.exit(1)
  }
}

export default connectDB;