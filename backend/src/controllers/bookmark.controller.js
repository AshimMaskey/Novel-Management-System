import User from "../models/user.model.js";
import Novel from "../models/novel.model.js";

export const handleAddRemoveBookmark = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) return res.status(404).json({ message: "Novel not found!" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.bookmarks.includes(novelId.toString())) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { bookmarks: novelId },
      });

      return res.status(200).json({ message: "Novel removed from bookmarks!" });
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { bookmarks: novelId },
      });

      return res
        .status(200)
        .json({ message: "Novel bookmarked successfully!" });
    }
  } catch (error) {
    console.error("Error adding removing bookmarks controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("bookmarks")
      .populate("bookmarks");
    if (!user) return res.status(404).json({ message: "User not found!" });

    const bookmarks = user.bookmarks;
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error getting bookmarks controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
