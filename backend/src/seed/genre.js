import mongoose from "mongoose";
import dotenv from "dotenv";
import Genre from "../models/genre.model.js";
dotenv.config();

const genres = [
  { name: "Fantasy" },
  { name: "Romance" },
  { name: "Science-Fi" },
  { name: "Mystery" },
  { name: "Action" },
  { name: "Comedy" },
  { name: "Horror" },
  { name: "Adventure" },
  { name: "Drama" },
  { name: "Thriller" },
];

const seedGenres = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Genre.deleteMany();
    await Genre.insertMany(genres);
    console.log("Genres seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding genres:", error);
    process.exit(1);
  }
};

seedGenres();
