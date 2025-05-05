import Comment from "../models/comment.model";
import User from "../models/user.model.js";

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
        .json({ message: "Comment should be at least 5 character" });

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
    return res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error creating comment controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
