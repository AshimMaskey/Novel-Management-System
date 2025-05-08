import Chapter from "../models/chapter.model.js";
import Comment from "../models/comment.model.js";
import Novel from "../models/novel.model.js";
import User from "../models/user.model.js";
import createNotification from "../utils/createNotfication.js";
import { handleManageComments } from "../utils/permission.js";

export const handleCreateComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { novelId, chapterId, content, spoiler } = req.body;

    if (!novelId || !chapterId || !content || spoiler === undefined)
      return res.status(400).json({ message: "All fields are required." });

    if (content.length < 5)
      return res
        .status(400)
        .json({ message: "Comment should be at least 5 characters long" });

    const comment = await Comment.create({
      user: userId,
      novel: novelId,
      chapter: chapterId,
      content,
      spoiler,
    });

    if (!comment)
      return res.status(400).json({ message: "Error posting comment" });
    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "username profileImg role"
    );

    const novel = await Novel.findById(novelId);
    const chapter = await Chapter.findById(chapterId);

    await createNotification({
      sender: userId,
      receiver: novel.author,
      type: "comment",
      message: `${user.username} has commented on chapter-${chapter.chapterNumber} of "${novel.title}".`,
    });

    return res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error creating comment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetCommentOnChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const comments = await Comment.find({ chapter: chapterId })
      .populate("user", "username profileImg")
      .sort({ createdAt: -1 });

    if (comments.length === 0)
      return res.status(404).json({ message: "No comments yet!" });

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting all comments in chapter  controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetCommentOnNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) return res.status(404).json({ message: "Novel not found" });

    const comments = await Comment.find({ novel: novelId })
      .populate("user", "username profileImg")
      .sort({ createdAt: -1 });

    if (comments.length === 0)
      return res.status(404).json({ message: "No comments yet!" });
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting all comments in novel controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(400).json({ message: "No comment found" });

    const hasPermission = await handleManageComments(commentId, req.user._id);
    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "You don't have permission to manage this comment!" });
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment)
      return res
        .status(400)
        .json({ message: "Error occurred deleting comment" });
    return res.status(200).json(deletedComment);
  } catch (error) {
    console.error("Error in deleteting comment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "No comment found" });

    const hasPermission = await handleManageComments(commentId, req.user._id);

    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "You don't have permission to manage this comment!" });

    const { content, spoiler } = req.body;
    const updatedData = {
      content: content || comment.content,
      spoiler: typeof spoiler === "boolean" ? spoiler : comment.spoiler,
    };

    if (content && content.length < 5)
      return res
        .status(400)
        .json({ message: "Comment should be at least 5 characters long" });
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updatedData,
      { new: true }
    );

    if (!updatedComment)
      return res
        .status(400)
        .json({ message: "Error occurred updating comment" });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error in updating comment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
