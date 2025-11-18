const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 10. CHALLENGE INVITATION MODEL
// ============================================
const challengeInvitationSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
    index: true
  },
  inviter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending',
    index: true
  },

  // Message
  message: {
    type: String,
    maxlength: 500
  },

  // Response
  responseMessage: {
    type: String,
    maxlength: 500
  },
  respondedAt: Date,

  // Expiry
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Indexes
challengeInvitationSchema.index({ challenge: 1, invitee: 1 }, { unique: true });
challengeInvitationSchema.index({ invitee: 1, status: 1 });

module.exports = mongoose.model('ChallengeInvitation', challengeInvitationSchema);
