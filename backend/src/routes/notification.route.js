import express from "express";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.route("/").get(verifyToken, handleShowAllNotifications);

export default router;
