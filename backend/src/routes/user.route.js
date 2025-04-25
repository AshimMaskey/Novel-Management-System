import express from "express";
import {
  handleFollowUnfollowUser,
  handleGetUserProfile,
  handleUpdateProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile/:username", handleGetUserProfile);
router.patch("/followUnfollow/:id", verifyToken, handleFollowUnfollowUser);
router.patch(
  "/updateProfile",
  verifyToken,
  upload.single("image"),
  handleUpdateProfile
);
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

export default router;
