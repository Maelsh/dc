const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 3. RATING MODEL
// ============================================
const ratingSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
    index: true
  },
  rater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  competitorRated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

// Compound indexes for aggregation
ratingSchema.index({ challenge: 1, competitorRated: 1 });
ratingSchema.index({ challenge: 1, timestamp: 1 });
ratingSchema.index({ rater: 1, challenge: 1, competitorRated: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
