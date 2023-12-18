import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";
import { customError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customError(404, "User doesn't exists!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(customError(201, "Wrong Credentials!"));
    const accessToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...data } = validUser._doc;
    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(200)
      .json(data);
  } catch (error) {
    next(error);
  }
};
