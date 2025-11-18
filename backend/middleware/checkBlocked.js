
// ============================================
// FILE: middleware/checkBlocked.js
// Check if users have blocked each other
// ============================================

const { User } = require('../models');

/**
 * Check if sender is blocked by receiver
 * Used for messaging and following
 */
const checkBlocked = async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.body.receiver || req.params.id;

    if (!receiverId) {
      return next();
    }

    // Get receiver
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Check if receiver has blocked sender
    if (receiver.blockedUsers.includes(senderId)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'USER_BLOCKED',
          message: 'You cannot perform this action. User has blocked you.'
        }
      });
    }

    // Check if sender has blocked receiver (optional check)
    const sender = await User.findById(senderId);
    if (sender && sender.blockedUsers.includes(receiverId)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'USER_BLOCKED',
          message: 'You have blocked this user'
        }
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkBlocked;