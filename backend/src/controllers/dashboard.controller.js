import Comment from "../models/comment.model.js";
import Genre from "../models/genre.model.js";
import Novel from "../models/novel.model.js";
import User from "../models/user.model.js";

export const fetchAdminDashboard = async (req, res) => {
  try {
    const [
      usersCount,
      novelsCount,
      commentsCount,
      authorsCount,
      adminCount,
      genresCount,
    ] = await Promise.all([
      User.countDocuments(),
      Novel.countDocuments(),
      Comment.countDocuments(),
      User.countDocuments({ role: "author" }),
      User.countDocuments({ role: "admin" }),
      Genre.countDocuments(),
    ]);

    return res.status(200).json({
      usersCount,
      novelsCount,
      commentsCount,
      authorsCount,
      adminCount,
      genresCount,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
