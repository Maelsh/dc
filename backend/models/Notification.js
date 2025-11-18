const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 9. NOTIFICATION MODEL
// ============================================
const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Type & Content
  type: {
    type: String,
    enum: [
      'challenge_invite',
      'invite_accepted',
      'invite_rejected',
      'challenge_starting',
      'challenge_completed',
      'new_comment',
      'new_follower',
      'new_message',
      'earnings_received',
      'admin_action',
      'report_update',
      'system_announcement'
    ],
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  link: {
    type: String,
    maxlength: 200
  },

  // Status
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: Date,

  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Metadata
  metadata: {
    challengeId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    reportId: mongoose.Schema.Types.ObjectId
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

// Indexes
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });
notificationSchema.index({ user: 1, type: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
