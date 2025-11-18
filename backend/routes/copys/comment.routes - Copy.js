// ============================================
// FILE: routes/comment.routes.js
// Comment Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  postComment,
  getChallengeComments,
  deleteComment
} = require('../controllers/comment.controller');

const { protect, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
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

// ============================================
// ROUTES
// ============================================

// Post comment (Protected)
router.post('/', 
  protect, 
  postCommentValidation, 
  validate, 
  postComment
);

// Get challenge comments (Public)
router.get('/challenge/:id', 
  optionalAuth,
  getChallengeCommentsValidation, 
  validate, 
  getChallengeComments
);

// Delete comment (Protected - Author or Admin)
router.delete('/:id', 
  protect, 
  deleteCommentValidation, 
  validate, 
  deleteComment
);

module.exports = router;
