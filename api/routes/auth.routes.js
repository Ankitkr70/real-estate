import express from "express";
import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: encryptPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User has been added.");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
