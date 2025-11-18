// ============================================
// FILE: routes/message.routes.js
// Message Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getInbox,
  getSentMessages,
  sendMessage,
  markAsRead,
  deleteMessage
} = require('../controllers/message.controller');

const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const checkBlocked = require('../middleware/checkBlocked');
const {
  sendMessageValidation,
  messageIdValidation,
  paginationValidation
} = require('../validators/message.validator');

// ============================================
// ROUTES
// ============================================

// Get inbox
router.get('/', 
  protect, 
  paginationValidation, 
  validate, 
  getInbox
);

// Get sent messages
router.get('/sent', 
  protect, 
  paginationValidation, 
  validate, 
  getSentMessages
);

// Send message (with block check)
router.post('/', 
  protect, 
  checkBlocked,
  sendMessageValidation, 
  validate, 
  sendMessage
);

// Mark message as read
router.put('/:id/read', 
  protect, 
  messageIdValidation, 
  validate, 
  markAsRead
);

// Delete message
router.delete('/:id', 
  protect, 
  messageIdValidation, 
  validate, 
  deleteMessage
);

module.exports = router;
