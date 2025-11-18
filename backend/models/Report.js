const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



// ============================================
// 5. REPORT MODEL
// ============================================
const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  reportedChallenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  },
  reportedComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },

  // Report Details
  reason: {
    type: String,
    enum: ['offensive', 'fraud', 'misconduct', 'misleading', 'rules_violation', 'spam', 'harassment', 'other'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Report description is required'],
    maxlength: 1000
  },
  evidence: {
    type: String,
    maxlength: 500
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'resolved', 'dismissed'],
    default: 'pending',
    index: true
  },

  // Admin Action
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminAction: {
    type: String,
    enum: ['none', 'warn', 'suspend', 'ban', 'delete_content', 'cancel_challenge']
  },
  actionReason: {
    type: String,
    maxlength: 1000
  },
  actionDate: Date,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  timestamps: true
});

// Indexes
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reviewedBy: 1 });

module.exports = mongoose.model('Report', reportSchema);