import express from "express";
import {
  handleChangePassword,
  handleFollowUnfollowUser,
  handleGetUserProfile,
  handleGetUsers,
  handleUpdateProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/multer.js";
import checkId from "../middlewares/checkId.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/profile/:username", handleGetUserProfile);
router.patch(
  "/followUnfollow/:id",
  verifyToken,
  checkId,
  handleFollowUnfollowUser
);
router.patch(
  "/updateProfile",
  verifyToken,
  upload.single("profileImg"),
  handleUpdateProfile
);
router.patch("/changePassword", verifyToken, handleChangePassword);
router.get("/profiles", verifyToken, authorize("admin"), handleGetUsers);

export default router;
