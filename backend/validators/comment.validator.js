const { body, param, query } = require('express-validator');

// ============================================
// VALIDATION RULES
// ============================================

const postCommentValidation = [
  body('challenge')
    .notEmpty()
    .withMessage('Challenge ID is required')
    .isMongoId()
    .withMessage('Invalid challenge ID'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
];

const getChallengeCommentsValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid challenge ID'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const deleteCommentValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid comment ID')
];

module.exports = {
  postCommentValidation,
  getChallengeCommentsValidation,
  deleteCommentValidation
};