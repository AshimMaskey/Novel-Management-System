import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const handleSignUp = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    //validation
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must start with a letter and can contain letters, numbers, and underscores (3-20 characters)",
      });
    }

    const fullNameRegex = /^[A-Za-z\s]+$/;
    if (!fullNameRegex.test(fullName)) {
      return res
        .status(400)
        .json({ message: "Full name should not contain numbers or symbols" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    //password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(res, newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        bookmarks: newUser.bookmarks,
        status: newUser.status,
        role: newUser.role,
        bio: newUser.bio,
      });
    }
  } catch (error) {
    console.error("Error in handleSignUp controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
