import express from "express";
import verifyToken from "../middlewares/verifyToken";
import checkId from "../middlewares/checkId";
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
