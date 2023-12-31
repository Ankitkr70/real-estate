import jwt from "jsonwebtoken";
import { customError } from "../utils/error.js";
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(customError(401, "Unauthorized"));

  //Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(customError(403, "Forbidden"));

    req.user = user;
    next();
  });
};

export default verifyToken;
