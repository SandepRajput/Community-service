import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  sendChatRequest,
  respondToChatRequest,
  getChatHistory,
  getUserChats,
  getPendingRequests,
} from "../controllers/directChat.controller.js";

const router = Router();

// ─── Direct Chat Routes
router.post("/request", protect, sendChatRequest);
router.patch("/request/:chatId", protect, respondToChatRequest); //request bhejra h uski id and recived user id
router.get("/history/:chatId", protect, getChatHistory);
router.get("/my-chats", protect, getUserChats);
router.get("/pending-requests", protect, getPendingRequests);

export default router;
