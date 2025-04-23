//imports
import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoute);

//server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
