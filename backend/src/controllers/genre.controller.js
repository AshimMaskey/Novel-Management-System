import Genre from "../models/genre.model.js";

export const handleCreateGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Field is required" });
    }
    const genreRegex = /^[a-zA-Z]{4,}$/;
    if (!genreRegex.test(name)) {
      return res.status(400).json({
        message:
          "Genre name must be at least 4 characters long and contain only letters",
      });
    }
    const existingGenre = await Genre.findOne({ name });
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
export const handleEditGenre = async (req, res) => {};
export const handleDeleteGenre = async (req, res) => {};
export const handleGetAllGenre = async (req, res) => {};
