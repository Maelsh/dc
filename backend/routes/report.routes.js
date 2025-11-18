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
const {
  submitReportValidation,
  getMyReportsValidation
} = require('../validators/report.validator');
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
