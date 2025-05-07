import Chapter from "../models/chapter.model.js";
import Genre from "../models/genre.model.js";
import Novel from "../models/novel.model.js";
import User from "../models/user.model.js";
import { handleManageNovel } from "../utils/permission.js";

export const handleCreateNovel = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description } = req.body;
    const genres = JSON.parse(req.body.genres);

    //validation
    if (!title || !description || !genres || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const novel = await Novel.find({ title });
    if (!novel.length === 0)
      return res.status(400).json({ message: "Novel title already exists" });

    if (typeof title !== "string" || title.trim().length <= 5) {
      return res.status(400).json({
        message: "Title must be a string with more than 5 characters",
      });
    }

    if (typeof description !== "string" || description.trim().length < 10) {
      return res
        .status(400)
        .json({ message: "Description must be at least 10 characters long" });
    }

    if (!Array.isArray(genres) || genres.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one genre is required" });
    }

    const newNovel = await Novel.create({
      title,
      description,
      genres,
      image: req.file.path,
      author: userId,
    });

    if (!newNovel) {
      return res.status(400).json({ message: "Failed to create novel" });
    }

    //Todo notification to followed user

    return res.status(201).json(newNovel);
  } catch (error) {
    console.error("Error creating novel controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }
    const updatedNovel = await Novel.findByIdAndUpdate(
      novelId,
      {
        $inc: { views: 1 },
      },
      { new: true }
    ).populate("author", "username");
    return res.status(200).json(updatedNovel);
  } catch (error) {
    console.error("Error getting novel controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetNovels = async (req, res) => {
  try {
    const novels = await Novel.find()
      .populate("author", "username")
      .sort({ views: -1 });
    if (novels.length === 0)
      return res.status(404).json({ message: "No novels found!" });
    return res.status(200).json(novels);
  } catch (error) {
    console.error("Error getting novels controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetNovelByAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    if (author.role === "reader") {
      return res.status(403).json({ message: "This user is not an author" });
    }
    const novels = await Novel.find({ author: authorId });
    if (!novels || novels.length === 0) {
      return res.status(404).json({ message: "No novels written yet!!" });
    }
    return res.status(200).json(novels);
  } catch (error) {
    console.error("Error getting novels by author controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetNovelByGenre = async (req, res) => {
  try {
    const genreName = req.params.genreName;
    const novels = await Novel.find({ genres: genreName }).populate(
      "author",
      "username"
    );
    if (!novels || novels.length === 0) {
      return res.status(404).json({ message: "No novels found in this genre" });
    }
    return res.status(200).json(novels);
  } catch (error) {
    console.error("Error getting novels by genre controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) return res.status(404).json({ message: "Novel not found" });

    const hasPermission = await handleManageNovel(novelId, req.user._id);
    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "You don't have permission to manage this novel!" });

    await Chapter.deleteMany({ novel: novelId });
    const deletedNovel = await Novel.findByIdAndDelete(novelId);
    if (!deletedNovel)
      return res.status(400).json({ message: "Error deleting the novel" });
    return res.status(200).json(deletedNovel);
  } catch (error) {
    console.error("Error deleting novel controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
