import express from "express";
import {
  handleGetUser,
  handleLogin,
  handleLogout,
  handleSignUp,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/getUser", verifyToken, handleGetUser);

export default router;
