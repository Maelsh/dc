// models/index.js
// Export all models from a single file

const User = require('./User');
const Challenge = require('./Challenge');
const Rating = require('./Rating');
const Comment = require('./Comment');
const Report = require('./Report');
const Transaction = require('./Transaction');
const Advertisement = require('./Advertisement');
const Message = require('./Message');
const Notification = require('./Notification');
const ChallengeInvitation = require('./ChallengeInvitation');

module.exports = {
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
};
