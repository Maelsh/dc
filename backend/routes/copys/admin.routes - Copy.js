// ============================================
// FILE: routes/admin.routes.js
// Admin Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getAllReports,
  takeActionOnReport,
  getAllUsers,
  suspendUser,
  unsuspendUser,
  listAdvertisements,
  createAdvertisement,
  assignAdvertisement,
  getPlatformAnalytics
} = require('../controllers/admin.controller');

const { protect, adminOnly } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { body, param, query } = require('express-validator');

// ============================================
// MIDDLEWARE: All routes require admin
// ============================================
router.use(protect);
router.use(adminOnly);

// ============================================
// VALIDATION RULES
// ============================================

const getAllReportsValidation = [
  query('status')
    .optional()
    .isIn(['pending', 'reviewing', 'resolved', 'dismissed'])
    .withMessage('Invalid status'),

  query('reason')
    .optional()
    .isIn(['offensive', 'fraud', 'misconduct', 'misleading', 'rules_violation', 'spam', 'harassment', 'other'])
    .withMessage('Invalid reason'),

  query('reportedUser')
    .optional()
    .isMongoId()
    .withMessage('Invalid reported user ID'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

const takeActionValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid report ID'),

  body('action')
    .notEmpty()
    .withMessage('Action is required')
    .isIn(['warn', 'suspend', 'ban', 'delete_content', 'cancel_challenge', 'none'])
    .withMessage('Invalid action'),

  body('actionReason')
    .trim()
    .notEmpty()
    .withMessage('Action reason is MANDATORY for transparency')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Action reason must be between 20 and 1000 characters')
];

const getAllUsersValidation = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),

  query('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role'),

  query('isSuspended')
    .optional()
    .isBoolean()
    .withMessage('isSuspended must be boolean'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const suspendUserValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID'),

  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 0, max: 365 })
    .withMessage('Duration must be between 0 (permanent) and 365 days'),

  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Suspension reason is MANDATORY')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Reason must be between 20 and 1000 characters')
];

const createAdValidation = [
  body('advertiser')
    .trim()
    .notEmpty()
    .withMessage('Advertiser name is required')
    .isLength({ max: 200 })
    .withMessage('Advertiser name cannot exceed 200 characters'),

  body('content.type')
    .notEmpty()
    .withMessage('Content type is required')
    .isIn(['video', 'image', 'text'])
    .withMessage('Invalid content type'),

  body('content.url')
    .if(body('content.type').isIn(['video', 'image']))
    .notEmpty()
    .withMessage('Content URL is required for video/image')
    .isURL()
    .withMessage('Content URL must be valid'),

  body('paidAmount')
    .notEmpty()
    .withMessage('Paid amount is required')
    .isFloat({ min: 1 })
    .withMessage('Paid amount must be at least 1')
];

const assignAdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid advertisement ID'),

  body('challengeId')
    .notEmpty()
    .withMessage('Challenge ID is required')
    .isMongoId()
    .withMessage('Invalid challenge ID'),

  body('displayTime')
    .notEmpty()
    .withMessage('Display time is required')
    .isISO8601()
    .withMessage('Display time must be a valid date')
];

// ============================================
// REPORTS MANAGEMENT
// ============================================

// Get all reports
router.get('/reports', 
  getAllReportsValidation, 
  validate, 
  getAllReports
);

// Take action on report
router.put('/reports/:id/action', 
  takeActionValidation, 
  validate, 
  takeActionOnReport
);

// ============================================
// USER MANAGEMENT
// ============================================

// Get all users
router.get('/users', 
  getAllUsersValidation, 
  validate, 
  getAllUsers
);

// Suspend user
router.put('/users/:id/suspend', 
  suspendUserValidation, 
  validate, 
  suspendUser
);

// Unsuspend user
router.put('/users/:id/unsuspend', 
  validate, 
  unsuspendUser
);

// ============================================
// ADVERTISEMENT MANAGEMENT
// ============================================

// List advertisements
router.get('/ads', 
  listAdvertisements
);

// Create advertisement
router.post('/ads', 
  createAdValidation, 
  validate, 
  createAdvertisement
);

// Assign advertisement to challenge
router.put('/ads/:id/assign', 
  assignAdValidation, 
  validate, 
  assignAdvertisement
);

// ============================================
// ANALYTICS
// ============================================

// Get platform analytics
router.get('/analytics', 
  getPlatformAnalytics
);

module.exports = router;
