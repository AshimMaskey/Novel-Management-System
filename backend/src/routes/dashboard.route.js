import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import { fetchAdminDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router
  .route("/adminDashboard")
  .get(verifyToken, authorize("admin"), fetchAdminDashboard);

export default router;
