import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
  getCommunity,
  searchCommunities,
  getCommunityMessages,
} from "../controllers/community.controller.js";

const router = Router();

// ─── Community Routes
router.post("/", protect, createCommunity);
router.get("/search", protect, searchCommunities);
router.get("/:communityId", protect, getCommunity);
router.post("/:communityId/join", protect, joinCommunity);
router.delete("/:communityId/leave", protect, leaveCommunity);
router.delete("/:communityId", protect, deleteCommunity);
router.get("/:communityId/messages", protect, getCommunityMessages);

export default router;
