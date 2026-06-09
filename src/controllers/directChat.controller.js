import * as directChatService from "../services/directChat.service.js";
import { success, error } from "../utils/response.js";
import logger from "../utils/logger.js";

// ─── Send Chat Request
export const sendChatRequest = async (req, res) => {
  try {
    const { toUserId, toUsername, requestMessage } = req.body;
    const chat = await directChatService.sendChatRequest(
      req.user.sub,
      req.user.username,
      toUserId,
      toUsername,
      requestMessage
    );
    return success(res, { chat }, "Chat request sent successfully", 201);
  } catch (err) {
    logger.error("Send chat request error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Respond to Chat Request
export const respondToChatRequest = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { action } = req.body;
    const chat = await directChatService.respondToChatRequest(
      chatId,
      req.user.sub,
      action,
    );
    return success(res, { chat }, `Chat request ${action}`);
  } catch (err) {
    logger.error("Respond to chat request error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Get Chat History
export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const data = await directChatService.getChatHistory(
      chatId,
      req.user.sub,
      page,
      limit,
    );
    return success(res, data, "Chat history fetched");
  } catch (err) {
    logger.error("Get chat history error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Get All User Chats
export const getUserChats = async (req, res) => {
  try {
    const chats = await directChatService.getUserChats(req.user.sub);
    return success(res, { chats }, "Chats fetched successfully");
  } catch (err) {
    logger.error("Get user chats error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};

// ─── Get Pending Requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await directChatService.getPendingRequests(req.user.sub);
    return success(res, { requests }, "Pending requests fetched");
  } catch (err) {
    logger.error("Get pending requests error:", {
      message: err.message,
      stack: err.stack,
    });
    return error(res, err.message, err.status || 500);
  }
};
