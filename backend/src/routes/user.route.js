import express from "express";
import { handleGetUserProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:username", handleGetUserProfile);

export default router;
