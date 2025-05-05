import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkId from "../middlewares/checkId.js";
import {
  handleCreateComment,
  handleDeleteComment,
  handleGetCommentOnChapter,
  handleGetCommentOnNovel,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/").post(verifyToken, handleCreateComment);
router.route("/chapter/:id").get(checkId, handleGetCommentOnChapter);
router.route("/novel/:id").get(checkId, handleGetCommentOnNovel);
router.route("/:id").delete(verifyToken, checkId, handleDeleteComment);

export default router;
