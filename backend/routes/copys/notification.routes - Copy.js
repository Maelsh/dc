// ============================================
// FILE: routes/notification.routes.js
// Notification Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../controllers/notification.controller');

const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { param, query } = require('express-validator');

// ============================================
// VALIDATION RULES
// ============================================

const getNotificationsValidation = [
  query('unread')
    .optional()
    .isBoolean()
    .withMessage('Unread must be a boolean'),

  query('type')
    .optional()
    .isIn([
      'challenge_invite',
      'invite_accepted',
      'invite_rejected',
      'challenge_starting',
      'challenge_completed',
      'new_comment',
      'new_follower',
      'new_message',
      'earnings_received',
      'admin_action',
      'report_update',
      'system_announcement'
    ])
    .withMessage('Invalid notification type'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

const notificationIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid notification ID')
];

// ============================================
// ROUTES
// ============================================

// Get notifications
router.get('/', 
  protect, 
  getNotificationsValidation, 
  validate, 
  getNotifications
);

// Mark notification as read
router.put('/:id/read', 
  protect, 
  notificationIdValidation, 
  validate, 
  markAsRead
);

// Mark all notifications as read
router.put('/read-all', 
  protect, 
  markAllAsRead
);

// Delete notification
router.delete('/:id', 
  protect, 
  notificationIdValidation, 
  validate, 
  deleteNotification
);

module.exports = router;
