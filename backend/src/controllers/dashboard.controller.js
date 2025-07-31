import Chapter from "../models/chapter.model.js";
import Comment from "../models/comment.model.js";
import Genre from "../models/genre.model.js";
import Novel from "../models/novel.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

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

export const fetchAuthorDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("followers");
    if (!user) return res.status(404).json({ message: "User not found" });
    const followersCount = user.followers.length;

    const novels = await Novel.find({ author: userId }).select("_id views");
    const novelIds = novels.map((novel) => novel._id);
    const novelsCount = novels.length;
    const viewsCount = novels.reduce((total, n) => total + (n.views || 0), 0);

    const reviewsCount = await Review.countDocuments({
      novel: { $in: novelIds },
    });

    const chapters = await Chapter.find({ novel: { $in: novelIds } }).select(
      "_id"
    );
    const chapterIds = chapters.map((chapter) => chapter._id);

    const commentsCount = await Comment.countDocuments({
      chapter: { $in: chapterIds },
    });

    return res.status(200).json({
      followersCount,
      novelsCount,
      viewsCount,
      reviewsCount,
      commentsCount,
    });
  } catch (error) {
    console.error("Error fetching author dashboard data:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
