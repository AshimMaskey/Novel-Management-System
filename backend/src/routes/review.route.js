import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkId from "../middlewares/checkId.js";
import {
  handleCreateReview,
  handleDeleteReview,
  handleGetReview,
  handleUpdateReview,
} from "../controllers/review.controller.js";
const router = express.Router();

router
  .route("/:id")
  .post(verifyToken, checkId, handleCreateReview)
  .delete(verifyToken, checkId, handleDeleteReview)
  .patch(verifyToken, checkId, handleUpdateReview)
  .get(checkId, handleGetReview);

export default router;
