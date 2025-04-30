import Chapter from "../models/chapter.model.js";
import Novel from "../models/novel.model.js";
import { handleManageChapter } from "../utils/permission.js";

export const handleCreateChapter = async (req, res) => {
  try {
    const { novelId, title, content, chapterNumber } = req.body;
    if (!novelId || !title || !content || !chapterNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const titleRegex = /^[a-zA-Z0-9\s.,!?'"-]{1,100}$/;
    const contentRegex = /\S/;
    const chapterNumberValid =
      Number.isInteger(Number(chapterNumber)) && Number(chapterNumber) > 0;

    if (!titleRegex.test(title)) {
      return res
        .status(400)
        .json({ message: "Title contains invalid characters or is too long" });
    }

    if (!contentRegex.test(content)) {
      return res.status(400).json({ message: "Content must not be empty" });
    }

    if (!chapterNumberValid) {
      return res
        .status(400)
        .json({ message: "Chapter number must be a positive integer" });
    }

    const hasPermission = await handleManageChapter(novelId, req.user._id);
    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "No permission to manage chapter" });

    const newChapter = await Chapter.create({
      novel: novelId,
      title,
      chapterNumber,
      content,
    });

    //Todo notification to the bookmarked user

    return res.status(201).json(newChapter);
  } catch (error) {
    console.error("Error creating chapter controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetChapter = async (req, res) => {
  try {
    const { id: novelId, chapNumber } = req.params;
    const chapterNumber = Number(chapNumber);

    if (!Number.isInteger(chapterNumber) || chapterNumber < 1) {
      return res.status(400).json({ message: "Invalid chapter number" });
    }

    const chapter = await Chapter.findOne({
      novel: novelId,
      chapterNumber: chapterNumber,
    });

    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const previousChapter = await Chapter.findOne({
      novel: novelId,
      chapterNumber: chapterNumber - 1,
    });

    const nextChapter = await Chapter.findOne({
      novel: novelId,
      chapterNumber: chapterNumber + 1,
    });

    return res.status(200).json({ chapter, previousChapter, nextChapter });
  } catch (error) {
    console.error("Error in getting chapter controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetAllChapters = async (req, res) => {
  try {
    const { id: novelId } = req.params;
    const novel = await Novel.findById(novelId);
    if (!novel) return res.status(404).json({ message: "Novel not found" });

    const chapters = await Chapter.find({ novel: novelId }).sort({
      chapterNumber: 1,
    });
    if (chapters.length === 0)
      return res
        .status(404)
        .json({ message: "No chapters available for this novel" });

    return res.status(200).json(chapters);
  } catch (error) {
    console.error("Error getting all chapters controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateChapter = async (req, res) => {
  try {
    const { id: chapterId } = req.params;
    const { title, chapterNumber, content } = req.body;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const hasPermission = await handleManageChapter(
      chapter.novel,
      req.user._id
    );
    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "No permission to manage chapter" });

    if (!title || !content || !chapterNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const titleRegex = /^[a-zA-Z0-9\s.,!?'"-]{1,100}$/;
    const contentRegex = /\S/;
    const chapterNumberValid =
      Number.isInteger(Number(chapterNumber)) && Number(chapterNumber) > 0;

    if (!titleRegex.test(title)) {
      return res
        .status(400)
        .json({ message: "Title contains invalid characters or is too long" });
    }

    if (!contentRegex.test(content)) {
      return res.status(400).json({ message: "Content must not be empty" });
    }

    if (!chapterNumberValid) {
      return res
        .status(400)
        .json({ message: "Chapter number must be a positive integer" });
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      {
        chapterNumber,
        title,
        content,
      },
      { new: true }
    );
    return res.status(200).json(updatedChapter);
  } catch (error) {
    console.error("Error updating chapter controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteChapter = async (req, res) => {
  try {
    const { id: chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const hasPermission = await handleManageChapter(
      chapter.novel,
      req.user._id
    );
    if (!hasPermission)
      return res
        .status(403)
        .json({ message: "No permission to manage chapter" });

    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    return res.status(200).json(deletedChapter);
  } catch (error) {
    console.error("Error deleting chapter controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
