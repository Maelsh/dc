const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ============================================
// 2. CHALLENGE MODEL
// ============================================
const challengeSchema = new mongoose.Schema({
  // Participants
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },

  // Classification
  category: {
    type: String,
    enum: ['dialogue', 'science', 'talent'],
    required: [true, 'Category is required']
  },
  field: {
    type: String,
    required: [true, 'Field is required'],
    maxlength: 100
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },

  // Rules & Settings
  rules: {
    duration: {
      type: Number,
      min: 5,
      max: 300,
      default: 60
    },
    rounds: {
      type: Number,
      min: 1,
      max: 10,
      default: 1
    },
    roundDuration: {
      type: Number,
      min: 1,
      max: 60
    },
    customRules: {
      type: String,
      maxlength: 2000
    }
  },

  // Scheduling
  scheduledTime: {
    type: Date,
    index: true
  },
  startedAt: Date,
  endedAt: Date,
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'live', 'completed', 'cancelled'],
    default: 'pending',
    index: true
  },

  // YouTube Streaming
  creatorYoutubeUrl: String,
  opponentYoutubeUrl: String,
  creatorStreamKey: String,
  opponentStreamKey: String,
  creatorBroadcastId: String,
  opponentBroadcastId: String,

  // Financial Data
  advertisements: [{
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Advertisement'
    },
    displayTime: Date,
    displayDuration: Number,
    status: {
      type: String,
      enum: ['pending', 'displayed', 'rejected'],
      default: 'pending'
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  }],
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },
  revenueDistribution: {
    platform: {
      type: Number,
      default: 0
    },
    creator: {
      type: Number,
      default: 0
    },
    opponent: {
      type: Number,
      default: 0
    }
  },

  // Statistics
  viewerCount: {
    type: Number,
    default: 0,
    min: 0
  },
  peakViewers: {
    type: Number,
    default: 0,
    min: 0
  },
  totalComments: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRatings: {
    type: Number,
    default: 0,
    min: 0
  },

  // Rating Summary
  creatorRatingSum: {
    type: Number,
    default: 0
  },
  opponentRatingSum: {
    type: Number,
    default: 0
  },
  creatorRatingCount: {
    type: Number,
    default: 0
  },
  opponentRatingCount: {
    type: Number,
    default: 0
  },

  // Localization
  language: {
    type: String,
    default: 'ar',
    index: true
  },
  country: {
    type: String,
    default: 'EG',
    index: true
  },

  // Moderation
  isReported: {
    type: Boolean,
    default: false
  },
  reportCount: {
    type: Number,
    default: 0
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  timestamps: true
});

// Compound indexes for queries
challengeSchema.index({ status: 1, scheduledTime: 1 });
challengeSchema.index({ category: 1, field: 1 });
challengeSchema.index({ creator: 1, status: 1 });
challengeSchema.index({ opponent: 1, status: 1 });
challengeSchema.index({ language: 1, country: 1, status: 1 });
challengeSchema.index({ createdAt: -1 });

// Virtual: Average creator rating
challengeSchema.virtual('creatorAvgRating').get(function() {
  return this.creatorRatingCount > 0 
    ? this.creatorRatingSum / this.creatorRatingCount 
    : 0;
});

// Virtual: Average opponent rating
challengeSchema.virtual('opponentAvgRating').get(function() {
  return this.opponentRatingCount > 0 
    ? this.opponentRatingSum / this.opponentRatingCount 
    : 0;
});

module.exports = mongoose.model('Challenge', challengeSchema);
