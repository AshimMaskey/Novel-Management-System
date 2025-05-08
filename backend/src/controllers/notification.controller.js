import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const handleShowAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    //todo toggle is read

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

export const handleDeleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notificationCount = await Notification.countDocuments({
      receiver: userId.toString(),
    });
    if (notificationCount === 0)
      return res.status(404).json({ message: "No notification to delete." });

    const deletedNotification = await Notification.deleteMany({
      receiver: userId.toString(),
    });

    if (deletedNotification.deletedCount === 0)
      return res.status(400).json({ message: "Error deleting Notifications" });

    return res.status(200).json(deletedNotification);
  } catch (error) {
    console.error("Error deleting all notification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleDeleteSingleNotification = async (req, res) => {
  try {
    const notificationdId = req.params.id;
    const notification = await Notification.findById(notificationdId);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    const deletedNotificationn = await Notification.findByIdAndDelete(
      notificationdId
    );
    if (!deletedNotificationn)
      return res.status(400).json({ message: "Error deleting notification" });
    return res.status(200).json(deletedNotificationn);
  } catch (error) {
    console.error("Error deleting single notification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
