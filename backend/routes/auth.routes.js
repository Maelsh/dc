// ============================================
// FILE: routes/auth.routes.js
// Authentication Routes
// ============================================

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  initiateYouTubeOAuth,
  handleYouTubeCallback,
  disconnectYouTube,
  forgotPassword,
  resetPassword
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} = require('../validators/auth.validator');

// ============================================
// PUBLIC ROUTES
// ============================================

// Register & Login
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Password Reset
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password/:token', resetPasswordValidation, validate, resetPassword);

// YouTube OAuth Callback (public but requires valid state)
router.get('/youtube/callback', handleYouTubeCallback);

// ============================================
// PROTECTED ROUTES (Require Authentication)
// ============================================

// Logout
router.post('/logout', protect, logout);

// Get current user
router.get('/me', protect, getMe);

// Update profile
router.put('/update-profile', protect, updateProfileValidation, validate, updateProfile);

// Change password
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);

// YouTube OAuth
router.post('/youtube/connect', protect, initiateYouTubeOAuth);
router.delete('/youtube/disconnect', protect, disconnectYouTube);

module.exports = router;
