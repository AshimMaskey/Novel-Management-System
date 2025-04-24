import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token or expired" });
    }
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken;
