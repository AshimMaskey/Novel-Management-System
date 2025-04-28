import Genre from "../models/genre.model.js";

export const handleCreateGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Field is required" });
    }
    const genreRegex = /^[a-zA-Z\s]{4,}$/;
    if (!genreRegex.test(name)) {
      return res.status(400).json({
        message:
          "Genre name must be at least 4 characters long and contain only letters",
      });
    }
    const existingGenre = await Genre.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });
    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists" });
    }
    const newGenre = await Genre.create({ name });
    return res.status(201).json(newGenre);
  } catch (error) {
    console.error("Error creating genre controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleEditGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genreId = req.params.id;

    if (!name) {
      return res.status(400).json({ message: "Field is required" });
    }

    const genreRegex = /^[a-zA-Z\s]{4,}$/;
    if (!genreRegex.test(name)) {
      return res.status(400).json({
        message:
          "Genre name must be at least 4 characters long and contain only letters",
      });
    }

    const genre = await Genre.findById(genreId);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    if (genre.name.toLowerCase() === name.toLowerCase()) {
      return res.status(200).json(genre);
    }

    const existingGenre = await Genre.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      _id: { $ne: genreId },
    });

    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const updatedGenre = await Genre.findByIdAndUpdate(
      genreId,
      { name },
      { new: true }
    );

    return res.status(200).json(updatedGenre);
  } catch (error) {
    console.error("Error editing genre controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    const deletedGenre = await Genre.findByIdAndDelete(id);
    return res.status(200).json(deletedGenre);
  } catch (error) {
    console.error("Error deleting genre controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetAllGenre = async (req, res) => {
  try {
    const genres = await Genre.find({}).sort({ createdAt: -1 });
    if (genres.length === 0) {
      return res.status(404).json({ message: "No genres found" });
    }
    return res.status(200).json(genres);
  } catch (error) {
    console.error("Error getting all genres controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
