import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    coverImg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_1280.jpg",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Novel",
        default: [],
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "reader", "author"],
      default: "reader",
    },
    bio: {
      type: String,
      default: "This user has not set a bio yet.",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
