import express from "express";
import {
  handleFollowUnfollowUser,
  handleGetUserProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/profile/:username", handleGetUserProfile);
router.patch("/followUnfollow/:id", verifyToken, handleFollowUnfollowUser);

export default router;
