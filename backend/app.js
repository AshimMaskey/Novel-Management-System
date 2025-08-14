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
import notificationRoute from "./src/routes/notification.route.js";
import bookmarkRoute from "./src/routes/bookmark.route.js";
import reviewRoute from "./src/routes/review.route.js";
import dashboardRoute from "./src/routes/dashboard.route.js";
import recommendRoute from "./src/routes/recommend.route.js";

import connectDB from "./src/utils/connectDB.js";

dotenv.config();
const app = express();

//middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://novel-management-system-frontend.vercel.app",
    ],
    credentials: true,
  })
);

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
app.use("/api/notification", notificationRoute);
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/review", reviewRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/recommend", recommendRoute);

//server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
