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

module.exports = {
  getNotificationsValidation,
  notificationIdValidation
};