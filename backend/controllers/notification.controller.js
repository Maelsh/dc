// ============================================
// FILE: controllers/notification.controller.js
// Notification Controller
// ============================================

const { Notification } = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Get notifications
 * @route   GET /api/v1/notifications
 * @access  Private
 */
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const { unread, type, page = 1, limit = 20 } = req.query;

  // Build query
  const query = { user: req.user._id };

  if (unread === 'true') {
    query.read = false;
  }

  if (type) {
    query.type = type;
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  // Get notifications
  const notifications = await Notification.find(query)
    .sort('-createdAt')
    .skip(skip)
    .limit(maxLimit);

  const total = await Notification.countDocuments(query);
  const unreadCount = await Notification.countDocuments({
    user: req.user._id,
    read: false
  });

  res.status(200).json({
    success: true,
    data: {
      notifications,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      },
      unreadCount
    }
  });
});

/**
 * @desc    Mark notification as read
 * @route   PUT /api/v1/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOTIFICATION_NOT_FOUND',
        message: 'Notification not found'
      }
    });
  }

  // Check ownership
  if (notification.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You can only mark your own notifications as read'
      }
    });
  }

  notification.read = true;
  notification.readAt = new Date();
  await notification.save();

  res.status(200).json({
    success: true,
    message: 'Notification marked as read'
  });
});

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/v1/notifications/read-all
 * @access  Private
 */
exports.markAllAsRead = asyncHandler(async (req, res, next) => {
  const result = await Notification.updateMany(
    { user: req.user._id, read: false },
    { 
      $set: { 
        read: true, 
        readAt: new Date() 
      } 
    }
  );

  logger.info(`Marked ${result.modifiedCount} notifications as read for user: ${req.user.username}`);

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read',
    data: {
      count: result.modifiedCount
    }
  });
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/v1/notifications/:id
 * @access  Private
 */
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOTIFICATION_NOT_FOUND',
        message: 'Notification not found'
      }
    });
  }

  // Check ownership
  if (notification.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You can only delete your own notifications'
      }
    });
  }

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully'
  });
});

module.exports = exports;
