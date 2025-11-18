
// ============================================
// FILE: scripts/cleanup.js
// Database Cleanup Script
// ============================================

require('dotenv').config();
const mongoose = require('mongoose');
const {
  User,
  Challenge,
  Rating,
  Comment,
  Report,
  Transaction,
  Advertisement,
  Message,
  Notification,
  ChallengeInvitation
} = require('../models');

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n⚠️  WARNING: This will delete ALL data from the database!');
    console.log('Press Ctrl+C within 5 seconds to cancel...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Deleting data...');

    await User.deleteMany({});
    await Challenge.deleteMany({});
    await Rating.deleteMany({});
    await Comment.deleteMany({});
    await Report.deleteMany({});
    await Transaction.deleteMany({});
    await Advertisement.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await ChallengeInvitation.deleteMany({});

    console.log('✅ All data deleted successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  cleanup();
}

module.exports = cleanup;