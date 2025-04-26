import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: String,
        required: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/VTUt0EdfIgKqfdGJxZnYySpwtQlAnLY33FlFLGk21hM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VlLzgy/L2RhL2VlODJkYTgx/MzAzMWI1MTJhOTFl/YjU0ZDE1MGVjZGMz/LmpwZw",
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
    views: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Novel = mongoose.model("Novel", novelSchema);
export default Novel;
