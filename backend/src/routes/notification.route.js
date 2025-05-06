import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  handleDeleteAllNotifications,
  handleDeleteSingleNotification,
  handleShowAllNotifications,
} from "../controllers/notification.controller.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, handleShowAllNotifications)
  .delete(verifyToken, handleDeleteAllNotifications);
router
  .route("/:id")
  .delete(verifyToken, checkId, handleDeleteSingleNotification);

export default router;
