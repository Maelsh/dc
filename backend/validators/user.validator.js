
// ============================================
// FILE: validators/user.validator.js
// User Validation Rules
// ============================================

const { body, query, param } = require('express-validator');

/**
 * Update bank details validation
 */
exports.updateBankDetailsValidation = [
  body('accountNumber')
    .trim()
    .notEmpty()
    .withMessage('Account number is required')
    .isLength({ min: 8, max: 30 })
    .withMessage('Account number must be between 8 and 30 characters')
    .matches(/^[0-9]+$/)
    .withMessage('Account number must contain only numbers'),

  body('bankName')
    .trim()
    .notEmpty()
    .withMessage('Bank name is required')
    .isLength({ max: 100 })
    .withMessage('Bank name cannot exceed 100 characters'),

  body('accountHolder')
    .trim()
    .notEmpty()
    .withMessage('Account holder name is required')
    .isLength({ max: 100 })
    .withMessage('Account holder name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Account holder name must contain only letters and spaces'),

  body('iban')
    .optional()
    .trim()
    .isLength({ max: 34 })
    .withMessage('IBAN cannot exceed 34 characters')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('IBAN must contain only uppercase letters and numbers')
];

/**
 * Search users validation
 */
exports.searchUsersValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),

  query('language')
    .optional()
    .isIn(['ar', 'en', 'fr', 'es', 'de', 'tr', 'ur'])
    .withMessage('Invalid language code'),

  query('country')
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be 2 characters')
    .isAlpha()
    .withMessage('Country code must contain only letters'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

/**
 * User ID parameter validation
 */
exports.userIdValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('User ID is required')
    .custom((value) => {
      // Check if it's a valid MongoDB ObjectId or username
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);
      
      if (!isObjectId && !isUsername) {
        throw new Error('Invalid user ID or username format');
      }
      
      return true;
    })
];