// ============================================
// FILE: controllers/rating.controller.js
// Rating Controller
// ============================================

const { Rating, Challenge } = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Submit rating during live challenge
 * @route   POST /api/v1/ratings
 * @access  Private (registered viewers only)
 */
exports.submitRating = asyncHandler(async (req, res, next) => {
  const { challenge: challengeId, competitorRated, score } = req.body;

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

  // Check if challenge is live
  if (challenge.status !== 'live') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'NOT_LIVE',
        message: 'Can only rate during live challenges'
      }
    });
  }

  // Check if competitor is participant
  const isParticipant = 
    competitorRated === challenge.creator.toString() ||
    competitorRated === challenge.opponent.toString();

  if (!isParticipant) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_COMPETITOR',
        message: 'Competitor is not a participant in this challenge'
      }
    });
  }

  // Check if user already rated this competitor
  const existingRating = await Rating.findOne({
    challenge: challengeId,
    rater: req.user._id,
    competitorRated
  });

  if (existingRating) {
    // Update existing rating
    existingRating.score = score;
    existingRating.timestamp = new Date();
    await existingRating.save();
  } else {
    // Create new rating
    await Rating.create({
      challenge: challengeId,
      rater: req.user._id,
      competitorRated,
      score
    });
  }

  // Update challenge stats
  const creatorRatings = await Rating.find({
    challenge: challengeId,
    competitorRated: challenge.creator
  });

  const opponentRatings = await Rating.find({
    challenge: challengeId,
    competitorRated: challenge.opponent
  });

  challenge.creatorRatingSum = creatorRatings.reduce((sum, r) => sum + r.score, 0);
  challenge.creatorRatingCount = creatorRatings.length;
  challenge.opponentRatingSum = opponentRatings.reduce((sum, r) => sum + r.score, 0);
  challenge.opponentRatingCount = opponentRatings.length;
  challenge.totalRatings = creatorRatings.length + opponentRatings.length;
  await challenge.save();

  // Broadcast rating update via WebSocket
  const io = req.app.get('io');
  io.to(`challenge:${challengeId}`).emit('ratings_update', {
    challengeId,
    ratings: {
      creator: {
        totalScore: challenge.creatorRatingSum,
        count: challenge.creatorRatingCount,
        average: challenge.creatorRatingCount > 0 
          ? challenge.creatorRatingSum / challenge.creatorRatingCount 
          : 0
      },
      opponent: {
        totalScore: challenge.opponentRatingSum,
        count: challenge.opponentRatingCount,
        average: challenge.opponentRatingCount > 0
          ? challenge.opponentRatingSum / challenge.opponentRatingCount
          : 0
      }
    },
    timestamp: new Date()
  });

  logger.info(`Rating submitted: ${req.user.username} → ${score} stars`);

  res.status(201).json({
    success: true,
    message: 'Rating submitted successfully',
    data: {
      rating: {
        challenge: challengeId,
        competitorRated,
        score,
        timestamp: new Date()
      },
      aggregated: {
        average: competitorRated === challenge.creator.toString()
          ? challenge.creatorRatingSum / challenge.creatorRatingCount
          : challenge.opponentRatingSum / challenge.opponentRatingCount,
        count: competitorRated === challenge.creator.toString()
          ? challenge.creatorRatingCount
          : challenge.opponentRatingCount
      }
    }
  });
});

/**
 * @desc    Get challenge ratings (aggregated)
 * @route   GET /api/v1/ratings/challenge/:id
 * @access  Public
 */
exports.getChallengeRatings = asyncHandler(async (req, res, next) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'CHALLENGE_NOT_FOUND',
        message: 'Challenge not found'
      }
    });
  }

  const totalRatings = challenge.creatorRatingSum + challenge.opponentRatingSum;

  res.status(200).json({
    success: true,
    data: {
      ratings: {
        creator: {
          totalScore: challenge.creatorRatingSum,
          count: challenge.creatorRatingCount,
          average: challenge.creatorRatingCount > 0
            ? challenge.creatorRatingSum / challenge.creatorRatingCount
            : 0,
          percentage: totalRatings > 0
            ? (challenge.creatorRatingSum / totalRatings) * 100
            : 0
        },
        opponent: {
          totalScore: challenge.opponentRatingSum,
          count: challenge.opponentRatingCount,
          average: challenge.opponentRatingCount > 0
            ? challenge.opponentRatingSum / challenge.opponentRatingCount
            : 0,
          percentage: totalRatings > 0
            ? (challenge.opponentRatingSum / totalRatings) * 100
            : 0
        },
        totalRatings: challenge.totalRatings
      }
    }
  });
});

module.exports = exports;
