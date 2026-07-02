import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  getNotificationCount,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", protect, getNotifications);
router.get("/count", protect, getNotificationCount);

export default router;