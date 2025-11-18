// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 60,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // Profile Information
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  preferredCategories: [{
    type: String,
    enum: ['dialogue', 'science', 'talent']
  }],
  language: {
    type: String,
    default: 'ar',
    enum: ['ar', 'en', 'fr', 'es', 'de', 'tr', 'ur']
  },
  country: {
    type: String,
    default: 'EG',
    maxlength: 2
  },

  // YouTube Integration
  youtubeLinked: {
    type: Boolean,
    default: false
  },
  youtubeAccessToken: String,
  youtubeRefreshToken: String,
  youtubeChannelId: String,
  youtubeChannelName: String,

  // Financial Information (Encrypted)
  bankDetails: {
    accountNumber: String,
    accountNumberIV: String,
    accountNumberAuthTag: String,
    bankName: String,
    accountHolder: String,
    iban: String
  },
  totalEarnings: {
    type: Number,
    default: 0,
    min: 0
  },

  // Transparency Stats
  followerCount: {
    type: Number,
    default: 0,
    min: 0
  },
  reportCount: {
    type: Number,
    default: 0,
    min: 0
  },
  overallRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalChallenges: {
    type: Number,
    default: 0,
    min: 0
  },

  // Social Connections
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  suspendedUntil: Date,
  lastLogin: Date,

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
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ language: 1, country: 1 });
userSchema.index({ youtubeChannelId: 1 });

// Virtual for full profile URL
userSchema.virtual('profileUrl').get(function() {
  return `/users/${this._id}`;
});

// Method: Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Pre-save hook: Hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);