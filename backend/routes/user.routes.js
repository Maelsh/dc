// ============================================
// FILE: routes/user.routes.js
// User Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  getUserChallenges,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getBlockedUsers,
  getUserEarnings,
  updateBankDetails,
  getBankDetails,
  searchUsers,
  getFollowers,
  getFollowing
} = require('../controllers/user.controller');

const { protect, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const checkBlocked = require('../middleware/checkBlocked');
const {
  updateBankDetailsValidation,
  searchUsersValidation
} = require('../validators/user.validator');

// ============================================
// PUBLIC ROUTES
// ============================================

// Search users
router.get('/search', searchUsersValidation, validate, searchUsers);

// Get user profile (optional auth for more details)
router.get('/:id', optionalAuth, getUserProfile);

// Get user's challenges
router.get('/:id/challenges', getUserChallenges);

// Get followers/following
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

// ============================================
// PROTECTED ROUTES
// ============================================

// Follow/Unfollow
router.post('/:id/follow', protect, checkBlocked, followUser);
router.delete('/:id/follow', protect, unfollowUser);

// Block/Unblock
router.post('/:id/block', protect, blockUser);
router.delete('/:id/block', protect, unblockUser);
router.get('/blocked', protect, getBlockedUsers);

// Earnings
router.get('/:id/earnings', protect, getUserEarnings);

// Bank details
router.put('/bank-details', protect, updateBankDetailsValidation, validate, updateBankDetails);
router.get('/bank-details', protect, getBankDetails);

module.exports = router;
