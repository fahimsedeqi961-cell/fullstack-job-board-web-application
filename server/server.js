import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import morgan from "morgan";
import globalErrorHandler from "./src/middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000

morgan.format(
  "custom",
  "Method: :method | URL: :url | Status: :status | Time: :response-time ms"
)
app.use(morgan("custom"));

app.use(express.json());
app.use(cookieParser());



app.use("/api/v1/auth", authRoutes);


app.use(globalErrorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is runinig on port ${PORT}`);
})
