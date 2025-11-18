const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 4. COMMENT MODEL
// ============================================
const commentSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
    index: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    minlength: [1, 'Comment cannot be empty'],
    maxlength: [500, 'Comment cannot exceed 500 characters'],
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

// Indexes
commentSchema.index({ challenge: 1, timestamp: -1 });
commentSchema.index({ author: 1, timestamp: -1 });

module.exports = mongoose.model('Comment', commentSchema);
