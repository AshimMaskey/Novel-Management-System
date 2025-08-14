import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = async (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("Error generating token and setting cookie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default generateTokenAndSetCookie;
