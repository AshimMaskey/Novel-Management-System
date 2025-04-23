import express from "express";
import User from "../models/user.model.js";
import { handleSignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", handleSignUp);

export default router;
