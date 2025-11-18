
// ============================================
// FILE: controllers/message.controller.js
// Message Controller
// ============================================

const { Message, User } = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Get inbox messages
 * @route   GET /api/v1/messages
 * @access  Private
 */
exports.getInbox = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20, unread } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  const query = {
    receiver: req.user._id,
    deletedByReceiver: false
  };

  if (unread === 'true') {
    query.read = false;
  }

  const messages = await Message.find(query)
    .populate('sender', 'username avatar')
    .sort('-createdAt')
    .skip(skip)
    .limit(maxLimit);

  const total = await Message.countDocuments(query);
  const unreadCount = await Message.countDocuments({
    receiver: req.user._id,
    read: false,
    deletedByReceiver: false
  });

  res.status(200).json({
    success: true,
    data: {
      messages,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      },
      unreadCount
    }
  });
});

/**
 * @desc    Get sent messages
 * @route   GET /api/v1/messages/sent
 * @access  Private
 */
exports.getSentMessages = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  const messages = await Message.find({
    sender: req.user._id,
    deletedBySender: false
  })
    .populate('receiver', 'username avatar')
    .sort('-createdAt')
    .skip(skip)
    .limit(maxLimit);

  const total = await Message.countDocuments({
    sender: req.user._id,
    deletedBySender: false
  });

  res.status(200).json({
    success: true,
    data: {
      messages,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      }
    }
  });
});

/**
 * @desc    Send message
 * @route   POST /api/v1/messages
 * @access  Private
 */
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { receiver: receiverId, subject, content } = req.body;

  // Check if receiver exists
  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'Receiver not found'
      }
    });
  }

  // Check if blocked (already handled by checkBlocked middleware)

  // Create message
  const message = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    subject: subject || 'No Subject',
    content
  });

  await message.populate(['sender', 'receiver'], 'username avatar');

  // Create notification
  const { Notification } = require('../models');
  await Notification.create({
    user: receiverId,
    type: 'new_message',
    content: `رسالة جديدة من ${req.user.username}`,
    link: '/messages',
    metadata: {
      userId: req.user._id
    }
  });

  logger.info(`Message sent: ${req.user.username} → ${receiver.username}`);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: { message }
  });
});

/**
 * @desc    Mark message as read
 * @route   PUT /api/v1/messages/:id/read
 * @access  Private (receiver only)
 */
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'MESSAGE_NOT_FOUND',
        message: 'Message not found'
      }
    });
  }

  // Check if receiver
  if (message.receiver.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You can only mark your own messages as read'
      }
    });
  }

  message.read = true;
  message.readAt = new Date();
  await message.save();

  res.status(200).json({
    success: true,
    message: 'Message marked as read'
  });
});

/**
 * @desc    Delete message (soft delete)
 * @route   DELETE /api/v1/messages/:id
 * @access  Private
 */
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'MESSAGE_NOT_FOUND',
        message: 'Message not found'
      }
    });
  }

  // Check if sender or receiver
  const isSender = message.sender.toString() === req.user._id.toString();
  const isReceiver = message.receiver.toString() === req.user._id.toString();

  if (!isSender && !isReceiver) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You can only delete your own messages'
      }
    });
  }

  // Soft delete
  if (isSender) {
    message.deletedBySender = true;
  }
  if (isReceiver) {
    message.deletedByReceiver = true;
  }

  await message.save();

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully'
  });
});

module.exports = exports;