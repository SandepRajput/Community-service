import Notification from "../models/Notification.js";
import { success, error } from "../utils/response.js";
import logger from "../utils/logger.js";

// Get notifications (fetch + delete)
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.sub,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (notifications.length > 0) {
      const ids = notifications.map((n) => n._id);

      await Notification.deleteMany({
        _id: { $in: ids },
      });
    }

    return success(
      res,
      {
        notifications,
        count: notifications.length,
      },
      "Notifications fetched",
    );
  } catch (err) {
    logger.error("Get notifications error:", {
      message: err.message,
      stack: err.stack,
    });

    return error(res, err.message, err.status || 500);
  }
};

// Get notification count
export const getNotificationCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.sub,
    });

    return success(
      res,
      { count },
      "Notification count fetched",
    );
  } catch (err) {
    logger.error("Get notification count error:", {
      message: err.message,
      stack: err.stack,
    });

    return error(res, err.message, err.status || 500);
  }
};