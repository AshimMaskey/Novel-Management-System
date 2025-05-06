import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const handleShowAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const notifications = await Notification.find({
      receiver: userId.toString(),
    })
      .populate("sender", "username profilePic")
      .populate("novel", "title")
      .populate("chapter", "title")
      .sort({ createdAt: -1 });
    if (!notifications)
      return res.status(404).json({ message: "No notifications yet!" });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error getting all notification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
