import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyTokenOptional = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next();
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next();
    }
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return next();
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyTokenOptional;
