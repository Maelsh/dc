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
const { body, param } = require('express-validator');

// ============================================
// VALIDATION RULES
// ============================================

const submitRatingValidation = [
  body('challenge')
    .notEmpty()
    .withMessage('Challenge ID is required')
    .isMongoId()
    .withMessage('Invalid challenge ID'),

  body('competitorRated')
    .notEmpty()
    .withMessage('Competitor ID is required')
    .isMongoId()
    .withMessage('Invalid competitor ID'),

  body('score')
    .notEmpty()
    .withMessage('Score is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Score must be between 1 and 5')
];

const challengeIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid challenge ID')
];

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
