const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ============================================
// 6. TRANSACTION MODEL
// ============================================
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },

  // Amount Details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'EGP', 'SAR', 'AED']
  },

  // Transaction Type
  type: {
    type: String,
    enum: ['challenge_earning', 'withdrawal', 'refund', 'bonus'],
    default: 'challenge_earning'
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'pending',
    index: true
  },

  // Payment Details
  invoiceNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'paypal', 'stripe', 'manual']
  },
  paymentDate: Date,
  paymentReference: String,

  // Metadata
  metadata: {
    ratingPercentage: Number,
    totalChallengeRevenue: Number,
    competitorRole: {
      type: String,
      enum: ['creator', 'opponent']
    }
  },

  // Notes
  notes: {
    type: String,
    maxlength: 500
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
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ invoiceNumber: 1 });

// Pre-save: Generate invoice number
transactionSchema.pre('save', function(next) {
  if (!this.invoiceNumber && this.type === 'challenge_earning') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.invoiceNumber = `INV-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
