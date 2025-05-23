import bcrypt, { genSalt } from "bcryptjs";
import User from "../models/user.model.js";
import createNotification from "../utils/createNotfication.js";

export const handleGetUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user profile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleFollowUnfollowUser = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { _id: senderId } = req.user;

    const recieverUser = await User.findById(recieverId);
    if (!recieverUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (recieverId === senderId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot follow/unfollow yourself" });
    }

    const isFollowing = senderUser.following.includes(recieverId);

    if (isFollowing) {
      await User.findByIdAndUpdate(senderId, {
        $pull: { following: recieverId },
      });
      await User.findByIdAndUpdate(recieverId, {
        $pull: { followers: senderId },
      });
      return res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(senderId, {
        $addToSet: { following: recieverId },
      });
      await User.findByIdAndUpdate(recieverId, {
        $addToSet: { followers: senderId },
      });

      //notification
      const notification = await createNotification({
        sender: senderId,
        receiver: recieverId,
        type: "follow",
        message: `${senderUser.username} followed you.`,
      });
      return res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error) {
    console.error("Error following/unfollowing user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateProfile = async (req, res) => {
  try {
    const { username, bio, fullName, email, role, status } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profileImgUrl = user.profileImg;
    if (req.file) {
      profileImgUrl = req.file.path;
    }

    const updatedFields = {
      username: username || user.username,
      bio: bio || user.bio,
      fullName: fullName || user.fullName,
      email: email || user.email,
      role: role || user.role,
      status: status || user.status,
      password: user.password,
      profileImg: profileImgUrl,
      coverImg: user.coverImg,
      bookmarks: user.bookmarks,
      followers: user.followers,
      following: user.following,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "New password cannot be same as old password" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, genSalt);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
