// ============================================
// FILE: routes/report.routes.js
// Report Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  submitReport,
  getMyReports
} = require('../controllers/report.controller');

const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { body, query } = require('express-validator');

// ============================================
// VALIDATION RULES
// ============================================

const submitReportValidation = [
  body('reportedUser')
    .notEmpty()
    .withMessage('Reported user ID is required')
    .isMongoId()
    .withMessage('Invalid reported user ID'),

  body('reportedChallenge')
    .optional()
    .isMongoId()
    .withMessage('Invalid challenge ID'),

  body('reportedComment')
    .optional()
    .isMongoId()
    .withMessage('Invalid comment ID'),

  body('reason')
    .notEmpty()
    .withMessage('Report reason is required')
    .isIn(['offensive', 'fraud', 'misconduct', 'misleading', 'rules_violation', 'spam', 'harassment', 'other'])
    .withMessage('Invalid report reason'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Report description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  body('evidence')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Evidence cannot exceed 500 characters')
];

const getMyReportsValidation = [
  query('status')
    .optional()
    .isIn(['pending', 'reviewing', 'resolved', 'dismissed'])
    .withMessage('Invalid status'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// ============================================
// ROUTES
// ============================================

// Submit report (Protected)
router.post('/', 
  protect, 
  submitReportValidation, 
  validate, 
  submitReport
);

// Get my submitted reports (Protected)
router.get('/my-reports', 
  protect, 
  getMyReportsValidation, 
  validate, 
  getMyReports
);

module.exports = router;
