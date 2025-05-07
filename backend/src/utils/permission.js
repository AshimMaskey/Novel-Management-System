import Comment from "../models/comment.model.js";
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

export const handleManageComments = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId).populate(
      "novel",
      "author"
    );
    if (!comment) return false;

    const user = await User.findById(userId);
    if (!user) return false;

    return (
      user.role === "admin" ||
      userId.toString() === comment.user.toString() ||
      userId.toString() === comment.novel.author.toString()
    );
  } catch (error) {
    console.error("Error in handleManageComment permission", error);
    return false;
  }
};

export const handleManageNovel = async (novelId, userId) => {
  try {
    const novel = await Novel.findById(novelId);
    if (!novel) return false;

    const user = await User.findById(userId);
    if (!user) return false;

    return (
      user.role === "admin" || userId.toString() === novel.author.toString()
    );
  } catch (error) {
    console.error("Error in handleMangeNovel permission", error);
    return false;
  }
};
