import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import {
  handleCreateNovel,
  handleGetNovel,
  handleGetNovelByAuthor,
  handleGetNovelByGenre,
} from "../controllers/novel.controller.js";
import upload from "../middlewares/multer.js";
import checkId from "../middlewares/checkId.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("author", "admin"),
  upload.single("image"),
  handleCreateNovel
);
router.get("/:id", checkId, handleGetNovel);
router.get("/author/:id", checkId, handleGetNovelByAuthor);
router.get("/genre/:genreName", handleGetNovelByGenre);

export default router;
