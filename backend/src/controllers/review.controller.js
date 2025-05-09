import Novel from "../models/novel.model.js";
import Review from "../models/review.model.js";
import createNotification from "../utils/createNotfication.js";

export const handleCreateReview = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const userId = req.user._id;

    const existingReview = await Review.findOne({
      novel: novelId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this novel" });
    }

    const { rating, review } = req.body;
    if (!rating || !review) {
      return res
        .status(400)
        .json({ message: "Rating and review are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    if (review.length < 10 || review.length > 200) {
      return res
        .status(400)
        .json({ message: "Review must be between 10 and 200 characters" });
    }

    const newReview = await Review.create({
      novel: novelId,
      user: userId,
      rating,
      review,
    });
    if (!newReview) {
      return res.status(400).json({ message: "Failed to create review" });
    }

    await createNotification({
      sender: userId,
      receiver: novel.author,
      type: "review",
      message: `${req.user.username} has reviewed your novel ${novel.title}`,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateReview = async (req, res) => {
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

    const { rating, review: reviewText } = req.body;
    if (!rating && !reviewText) {
      return res
        .status(400)
        .json({ message: "Rating or review text is required" });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    if (reviewText && (reviewText.length < 10 || reviewText.length > 200)) {
      return res
        .status(400)
        .json({ message: "Review must be between 10 and 200 characters" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, review: reviewText },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
    return res.status(500).json({ message: "Internal server error" });
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
