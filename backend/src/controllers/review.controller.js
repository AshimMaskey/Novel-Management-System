import Novel from "../models/novel.model.js";
import Review from "../models/review.model.js";

export const handleCreateReview = async (req, res) => {};
export const handleUpdateReview = async (req, res) => {};

export const handleGetReview = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const reviews = await Review.find({ novel: novelId })
      .populate("user", "username profileImg")
      .sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this novel" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json(deletedReview);
  } catch (error) {
    console.error("Error deleting review controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
