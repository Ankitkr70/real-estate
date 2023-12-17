import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

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
app.listen(3000, () => {
  console.log("Server has been started on port 3000");
});

//All the Routes
app.use("/api/user", userRouter);
