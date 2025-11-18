
// ============================================
// FILE: controllers/comment.controller.js
// Comment Controller
// ============================================

const { Comment, Challenge } = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Post comment on challenge
 * @route   POST /api/v1/comments
 * @access  Private (registered users only)
 */
exports.postComment = asyncHandler(async (req, res, next) => {
  const { challenge: challengeId, content } = req.body;

  // Get challenge
  const challenge = await Challenge.findById(challengeId);

  if (!challenge) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'CHALLENGE_NOT_FOUND',
        message: 'Challenge not found'
      }
    });
  }

  // Can comment on live or completed challenges
  if (!['live', 'completed'].includes(challenge.status)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_STATUS',
        message: 'Can only comment on live or completed challenges'
      }
    });
  }

  // Create comment
  const comment = await Comment.create({
    challenge: challengeId,
    author: req.user._id,
    content
  });

  await comment.populate('author', 'username avatar');

  // Update challenge comment count
  challenge.totalComments += 1;
  await challenge.save();

  // Broadcast comment via WebSocket
  const io = req.app.get('io');
  io.to(`challenge:${challengeId}`).emit('comment_added', {
    challengeId,
    comment: {
      id: comment._id,
      author: {
        id: comment.author._id,
        username: comment.author.username,
        avatar: comment.author.avatar
      },
      content: comment.content,
      timestamp: comment.timestamp
    },
    timestamp: new Date()
  });

  logger.info(`Comment posted: ${req.user.username} on challenge ${challengeId}`);

  res.status(201).json({
    success: true,
    message: 'Comment posted successfully',
    data: { comment }
  });
});

/**
 * @desc    Get challenge comments
 * @route   GET /api/v1/comments/challenge/:id
 * @access  Public
 */
exports.getChallengeComments = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 100);

  const comments = await Comment.find({
    challenge: req.params.id,
    isDeleted: false
  })
    .populate('author', 'username avatar')
    .sort('-timestamp')
    .skip(skip)
    .limit(maxLimit);

  const total = await Comment.countDocuments({
    challenge: req.params.id,
    isDeleted: false
  });

  res.status(200).json({
    success: true,
    data: {
      comments,
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
 * @desc    Delete comment (soft delete)
 * @route   DELETE /api/v1/comments/:id
 * @access  Private (author or admin only)
 */
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'COMMENT_NOT_FOUND',
        message: 'Comment not found'
      }
    });
  }

  // Check permission
  const isAuthor = comment.author.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isAuthor && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You can only delete your own comments'
      }
    });
  }

  // Soft delete
  comment.isDeleted = true;
  await comment.save();

  logger.info(`Comment deleted: ${req.params.id}`);

  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully'
  });
});

module.exports = exports;
