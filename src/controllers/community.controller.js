import * as communityService from "../services/community.service.js";
import { success, error } from "../utils/response.js";
import logger from "../utils/logger.js";

// ─── Create Community
export const createCommunity = async (req, res) => {
  try {
    const community = await communityService.createCommunity(
      req.user.sub,
      req.user.username,
      req.body,
    );
    return success(res, { community }, "Community created successfully", 201);
  } catch (err) {
    logger.error("Create community error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Join Community
export const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await communityService.joinCommunity(
      communityId,
      req.user.sub,
      req.user.username,
    );
    return success(res, { community }, "Joined community successfully");
  } catch (err) {
    logger.error("Join community error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Leave Community
export const leaveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    await communityService.leaveCommunity(communityId, req.user.sub);
    return success(res, {}, "Left community successfully");
  } catch (err) {
    logger.error("Leave community error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Delete Community
export const deleteCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    await communityService.deleteCommunity(communityId, req.user.sub);
    return success(res, {}, "Community deleted successfully");
  } catch (err) {
    logger.error("Delete community error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Get Community
export const getCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await communityService.getCommunity(communityId);
    return success(res, { community }, "Community fetched successfully");
  } catch (err) {
    logger.error("Get community error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Search Communities
export const searchCommunities = async (req, res) => {
  try {
    const { city, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await communityService.searchCommunities({
      city,
      search,
      page,
      limit,
    });
    return success(res, data, "Communities fetched successfully");
  } catch (err) {
    logger.error("Search communities error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Get Community Messages
export const getCommunityMessages = async (req, res) => {
  try {
    const { communityId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const data = await communityService.getCommunityMessages(
      communityId,
      req.user.sub,
      page,
      limit,
    );
    return success(res, data, "Messages fetched successfully");
  } catch (err) {
    logger.error("Get community messages error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};
