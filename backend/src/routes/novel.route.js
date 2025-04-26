import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import {
  handleCreateNovel,
  handleGetNovel,
} from "../controllers/novel.controller.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("author", "admin"),
  upload.single("image"),
  handleCreateNovel
);
router.get("/:id", handleGetNovel);

export default router;
