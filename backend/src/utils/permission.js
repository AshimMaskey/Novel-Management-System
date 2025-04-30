import Novel from "../models/novel.model.js";
import User from "../models/user.model.js";

export const handleManageChapter = async (novelId, userId) => {
  try {
    const novel = await Novel.findById(novelId);
    if (!novel) return false;

    const user = await User.findById(userId);
    if (!user) return false;

    return (
      user.role === "admin" || userId.toString() === novel.author.toString()
    );
  } catch (error) {
    console.error("Error in handleManageChapter permission", error);
    return false;
  }
};
