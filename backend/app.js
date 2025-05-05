//imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import novelRoute from "./src/routes/novel.route.js";
import genreRoute from "./src/routes/genre.route.js";
import chapterRoute from "./src/routes/chapter.route.js";
import commentRoute from "./src/routes/comment.route.js";
import connectDB from "./src/utils/connectDB.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/novel", novelRoute);
app.use("/api/genre", genreRoute);
app.use("/api/chapter", chapterRoute);
app.use("/api/comment", commentRoute);

//server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
