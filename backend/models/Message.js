const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 8. MESSAGE MODEL
// ============================================
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Content
  subject: {
    type: String,
    maxlength: 200,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    maxlength: 2000,
    trim: true
  },

  // Status
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: Date,

  // Soft Delete
  deletedBySender: {
    type: Boolean,
    default: false
  },
  deletedByReceiver: {
    type: Boolean,
    default: false
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

// Compound indexes
messageSchema.index({ receiver: 1, read: 1, createdAt: -1 });
messageSchema.index({ sender: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
