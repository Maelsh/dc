// ============================================
// FILE: controllers/report.controller.js
// Report Controller
// ============================================

const { Report, User, Challenge, Notification } = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Submit report
 * @route   POST /api/v1/reports
 * @access  Private
 */
exports.submitReport = asyncHandler(async (req, res, next) => {
  const {
    reportedUser,
    reportedChallenge,
    reportedComment,
    reason,
    description,
    evidence
  } = req.body;

  // Check if reported user exists
  const userExists = await User.findById(reportedUser);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'Reported user not found'
      }
    });
  }

  // Cannot report yourself
  if (reportedUser === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'CANNOT_REPORT_SELF',
        message: 'You cannot report yourself'
      }
    });
  }

  // Check for duplicate report
  const existingReport = await Report.findOne({
    reporter: req.user._id,
    reportedUser,
    reportedChallenge: reportedChallenge || null,
    reportedComment: reportedComment || null,
    status: { $in: ['pending', 'reviewing'] }
  });

  if (existingReport) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_REPORT',
        message: 'You have already reported this user/content'
      }
    });
  }

  // Create report
  const report = await Report.create({
    reporter: req.user._id,
    reportedUser,
    reportedChallenge: reportedChallenge || undefined,
    reportedComment: reportedComment || undefined,
    reason,
    description,
    evidence: evidence || ''
  });

  // Increment report count on user
  await User.findByIdAndUpdate(reportedUser, {
    $inc: { reportCount: 1 }
  });

  // Notify admins (get all admin users)
  const admins = await User.find({ role: 'admin' });
  
  const adminNotifications = admins.map(admin => ({
    user: admin._id,
    type: 'report_update',
    content: `بلاغ جديد من ${req.user.username} ضد ${userExists.username}`,
    link: `/admin/reports/${report._id}`,
    priority: 'high',
    metadata: {
      reportId: report._id,
      userId: reportedUser
    }
  }));

  if (adminNotifications.length > 0) {
    await Notification.insertMany(adminNotifications);
  }

  logger.info(`Report submitted: ${req.user.username} reported ${userExists.username}`);

  res.status(201).json({
    success: true,
    message: 'Report submitted successfully',
    data: { report }
  });
});

/**
 * @desc    Get my submitted reports
 * @route   GET /api/v1/reports/my-reports
 * @access  Private
 */
exports.getMyReports = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 10 } = req.query;

  // Build query
  const query = { reporter: req.user._id };
  if (status) {
    query.status = status;
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  // Get reports
  const reports = await Report.find(query)
    .populate('reportedUser', 'username avatar')
    .populate('reportedChallenge', 'title category')
    .populate('reviewedBy', 'username')
    .sort('-createdAt')
    .skip(skip)
    .limit(maxLimit);

  const total = await Report.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      reports,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      }
    }
  });
});

module.exports = exports;
