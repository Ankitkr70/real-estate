import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";
import { customError } from "../utils/error.js";

//Sign UP function
export const signup = async (req, res, next) => {
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
    // res.status(500).json(error.message);
    next(customError(500, error.message));
  }
};

//Sign In function
