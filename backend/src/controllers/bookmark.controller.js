import User from "../models/user.model";

export const handleAddRemoveBookmark = async (req, res) => {};
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
