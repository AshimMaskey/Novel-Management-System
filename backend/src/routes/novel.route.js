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
  handleSearchNovel,
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
router.route("/search").get(handleSearchNovel);

export default router;
