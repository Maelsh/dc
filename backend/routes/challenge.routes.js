// ============================================
// FILE: routes/challenge.routes.js
// Challenge Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  listChallenges,
  getChallengeDetails,
  createChallenge,
  updateChallenge,
  cancelChallenge,
  requestToJoin,
  acceptRejectJoinRequest,
  startChallenge,
  endChallenge,
  rejectAdvertisement,
  getChallengeRatings,
  getChallengeComments
} = require('../controllers/challenge.controller');

const { protect, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  createChallengeValidation,
  updateChallengeValidation,
  joinRequestValidation,
  acceptRejectValidation,
  rejectAdValidation
} = require('../validators/challenge.validator');

// ============================================
// PUBLIC ROUTES
// ============================================

// List and search challenges
router.get('/', optionalAuth, listChallenges);

// Get challenge details
router.get('/:id', optionalAuth, getChallengeDetails);

// Get challenge ratings (aggregated)
router.get('/:id/ratings', getChallengeRatings);

// Get challenge comments
router.get('/:id/comments', getChallengeComments);

// ============================================
// PROTECTED ROUTES
// ============================================

// Create challenge
router.post('/', protect, createChallengeValidation, validate, createChallenge);

// Update challenge
router.put('/:id', protect, updateChallengeValidation, validate, updateChallenge);

// Cancel challenge
router.delete('/:id', protect, cancelChallenge);

// Join challenge
router.post('/:id/join', protect, joinRequestValidation, validate, requestToJoin);

// Accept/Reject join request
router.put('/:id/accept/:userId', protect, acceptRejectValidation, validate, acceptRejectJoinRequest);

// Start challenge
router.post('/:id/start', protect, startChallenge);

// End challenge
router.post('/:id/end', protect, endChallenge);

// Reject advertisement
router.post('/:id/reject-ad/:adId', protect, rejectAdValidation, validate, rejectAdvertisement);

module.exports = router;
