import User from "../models/user.model.js";
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
      return res.status(200).json({ message: "Followed successfully" });

      //Todo: send notification to the reciever user
    }
  } catch (error) {
    console.error("Error following/unfollowing user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
