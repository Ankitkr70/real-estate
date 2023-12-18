import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

//data base connection
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

//starting the to listed to port number 3000
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server has been started on port 3000");
});

//All the Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
