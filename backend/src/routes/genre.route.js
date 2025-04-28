import express from "express";
import verifyToken from "../middlewares/verifyToken";
import authorize from "../middlewares/authorize";
import checkId from "../middlewares/checkId";

const router = express.Router();

router.post("/", verifyToken, authorize("admin"), handleCreateGenre);
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
