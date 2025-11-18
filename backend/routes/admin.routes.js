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


// ============================================
// MIDDLEWARE: All routes require admin
// ============================================
router.use(protect);
router.use(adminOnly);

const {
  getAllReportsValidation,
  takeActionValidation,
  getAllUsersValidation,
  suspendUserValidation,
  createAdValidation,
  assignAdValidation
} = require('../validators/admin.validator');
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
