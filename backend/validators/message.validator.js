const { body, param, query } = require('express-validator');

// ============================================
// VALIDATION RULES
// ============================================

const sendMessageValidation = [
  body('receiver')
    .notEmpty()
    .withMessage('Receiver ID is required')
    .isMongoId()
    .withMessage('Invalid receiver ID'),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters')
];

const messageIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid message ID')
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),

  query('unread')
    .optional()
    .isBoolean()
    .withMessage('Unread must be a boolean')
];

module.exports = {
  sendMessageValidation,
  messageIdValidation,
  paginationValidation
};