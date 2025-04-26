import Novel from "../models/novel.model.js";

export const handleCreateNovel = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description } = req.body;
    const genres = JSON.parse(req.body.genres);

    //validation
    if (!title || !description || !genres || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
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
