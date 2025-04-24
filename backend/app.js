//imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import connectDB from "./src/utils/connectDB.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);

//server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
