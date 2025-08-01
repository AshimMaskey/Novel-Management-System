import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import {
  handleCreateNovel,
  handleDeleteNovel,
  handleGetNovel,
  handleGetNovelByAuthor,
  handleGetNovelByGenre,
  handleGetNovels,
  handleGetRandomNovels,
  handleSearchNovel,
  handleUpdateNovel,
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
router.route("/search").get(handleSearchNovel);
router.route("/randomNovels").get(handleGetRandomNovels);
router.get("/:id", checkId, handleGetNovel);
router.get("/", handleGetNovels);
router.get("/author/:id", checkId, handleGetNovelByAuthor);
router.get("/genre/:genreName", handleGetNovelByGenre);
router.delete(
  "/:id",
  verifyToken,
  authorize("author", "admin"),
  checkId,
  handleDeleteNovel
);
router.patch(
  "/:id",
  verifyToken,
  authorize("author", "admin"),
  upload.single("image"),
  checkId,
  handleUpdateNovel
);

export default router;
