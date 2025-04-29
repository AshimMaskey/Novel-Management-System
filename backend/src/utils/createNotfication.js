import Notification from "../models/notification.model.js";

const createNotification = async ({
  sender,
  receiver,
  type,
  novel,
  chapter,
  message,
}) => {
  try {
    const newNotification = await Notification.create({
      sender,
      receiver,
      type,
      novel,
      chapter,
      message,
    });

    return newNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification");
  }
};

export default createNotification;
