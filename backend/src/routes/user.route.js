import express from "express";
import {
  handleChangePassword,
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
router.patch("/changePassword", verifyToken, handleChangePassword);

export default router;
