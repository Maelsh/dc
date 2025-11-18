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

module.exports = {
  submitRatingValidation,
  challengeIdValidation
};