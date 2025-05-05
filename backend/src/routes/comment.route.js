import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { handleCreateComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/").post(verifyToken, handleCreateComment);

export default router;
