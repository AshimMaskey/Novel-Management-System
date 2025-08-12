import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import checkId from "../middlewares/checkId.js";
import {
  handleCreateGenre,
  handleDeleteGenre,
  handleEditGenre,
  handleGetAllGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.post("/", verifyToken, handleCreateGenre);
router.patch("/:id", verifyToken, authorize("admin"), checkId, handleEditGenre);
router.delete(
  "/:id",
  verifyToken,
  authorize("admin"),
  checkId,
  handleDeleteGenre
);
router.get("/", handleGetAllGenre);

export default router;
