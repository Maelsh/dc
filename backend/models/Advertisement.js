const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 7. ADVERTISEMENT MODEL
// ============================================
const advertisementSchema = new mongoose.Schema({
  advertiser: {
    type: String,
    required: [true, 'Advertiser name is required'],
    maxlength: 200
  },
  advertiserContact: {
    email: String,
    phone: String
  },

  // Content
  content: {
    type: {
      type: String,
      enum: ['video', 'image', 'text'],
      required: true
    },
    url: String,
    text: String,
    thumbnailUrl: String
  },

  // Financial
  paidAmount: {
    type: Number,
    required: true,
    min: 0
  },
  calculatedDuration: {
    type: Number,
    required: true,
    min: 5
  },

  // Assignment
  assignedChallenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    index: true
  },
  displayTime: Date,

  // Status
  status: {
    type: String,
    enum: ['pending', 'assigned', 'displayed', 'rejected', 'expired', 'cancelled'],
    default: 'pending',
    index: true
  },

  // Rejection Info
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: {
    type: String,
    maxlength: 500
  },
  rejectionDate: Date,

  // Admin Info
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Indexes
advertisementSchema.index({ status: 1 });
advertisementSchema.index({ assignedChallenge: 1 });
advertisementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Advertisement', advertisementSchema);
