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
const {
  postCommentValidation,
  getChallengeCommentsValidation,
  deleteCommentValidation
} = require('../validators/comment.validator');

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
