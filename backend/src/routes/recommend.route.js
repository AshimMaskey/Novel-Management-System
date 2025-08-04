import express from "express";
import { handleRecommendNovels } from "../controllers/recommend.controller.js";
import verifyTokenOptional from "../middlewares/verifyTokenOptional.js";

const router = express.Router();

router.route("/").get(verifyTokenOptional, handleRecommendNovels);

export default router;
