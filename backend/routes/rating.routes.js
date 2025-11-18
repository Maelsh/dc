// ============================================
// FILE: routes/rating.routes.js
// Rating Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  submitRating,
  getChallengeRatings
} = require('../controllers/rating.controller');

const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  submitRatingValidation,
  challengeIdValidation
} = require('../validators/rating.validator');

// ============================================
// ROUTES
// ============================================

// Submit rating (Protected - Registered users only)
router.post('/', 
  protect, 
  submitRatingValidation, 
  validate, 
  submitRating
);

// Get challenge ratings (Public)
router.get('/challenge/:id', 
  challengeIdValidation, 
  validate, 
  getChallengeRatings
);

module.exports = router;
