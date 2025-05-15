import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkId from "../middlewares/checkId.js";
import {
  handleAddRemoveBookmark,
  handleGetBookmark,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

router.route("/:id").patch(verifyToken, checkId, handleAddRemoveBookmark);
router.route("/").get(verifyToken, handleGetBookmark);

export default router;
