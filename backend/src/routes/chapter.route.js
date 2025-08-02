import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import {
  handleChapterCount,
  handleCreateChapter,
  handleDeleteChapter,
  handleGetAllChapters,
  handleGetChapter,
  handleUpdateChapter,
} from "../controllers/chapter.controller.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorize("admin", "author"),
  handleCreateChapter
);
router.get("/chapCount/:id", checkId, handleChapterCount);
router.get("/:id/:chapNumber", checkId, handleGetChapter);
router.get("/:id", checkId, handleGetAllChapters);
router.delete(
  "/:id",
  verifyToken,
  authorize("admin", "author"),
  checkId,
  handleDeleteChapter
);
router.patch(
  "/:id",
  verifyToken,
  authorize("admin", "author"),
  checkId,
  handleUpdateChapter
);

export default router;
