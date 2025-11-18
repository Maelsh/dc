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
const {
  getNotificationsValidation,
  notificationIdValidation
} = require('../validators/notification.validator');

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
