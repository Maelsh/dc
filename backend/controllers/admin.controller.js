// ============================================
// FILE: controllers/admin.controller.js
// Admin Controller - Part 1 (Reports & Users)
// ============================================

const { 
  Report, 
  User, 
  Challenge, 
  Advertisement,
  Transaction,
  Rating,
  Comment,
  Notification 
} = require('../models');
const logger = require('../config/logger');
const asyncHandler = require('../middleware/asyncHandler');

// ============================================
// REPORTS MANAGEMENT
// ============================================

/**
 * @desc    Get all reports
 * @route   GET /api/v1/admin/reports
 * @access  Private (Admin only)
 */
exports.getAllReports = asyncHandler(async (req, res, next) => {
  const {
    status,
    reason,
    reportedUser,
    page = 1,
    limit = 20,
    sort = 'createdAt'
  } = req.query;

  // Build query
  const query = {};
  if (status) query.status = status;
  if (reason) query.reason = reason;
  if (reportedUser) query.reportedUser = reportedUser;

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  // Get reports
  const reports = await Report.find(query)
    .populate('reporter', 'username avatar')
    .populate('reportedUser', 'username avatar reportCount')
    .populate('reportedChallenge', 'title category')
    .populate('reviewedBy', 'username')
    .sort(`-${sort}`)
    .skip(skip)
    .limit(maxLimit);

  const total = await Report.countDocuments(query);

  // Get stats
  const stats = {
    pending: await Report.countDocuments({ status: 'pending' }),
    reviewing: await Report.countDocuments({ status: 'reviewing' }),
    resolved: await Report.countDocuments({ status: 'resolved' }),
    dismissed: await Report.countDocuments({ status: 'dismissed' })
  };

  res.status(200).json({
    success: true,
    data: {
      reports,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      },
      stats
    }
  });
});

/**
 * @desc    Take action on report
 * @route   PUT /api/v1/admin/reports/:id/action
 * @access  Private (Admin only)
 */
exports.takeActionOnReport = asyncHandler(async (req, res, next) => {
  const { action, actionReason } = req.body;

  const report = await Report.findById(req.params.id)
    .populate('reportedUser', 'username email');

  if (!report) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'REPORT_NOT_FOUND',
        message: 'Report not found'
      }
    });
  }

  // Update report
  report.status = 'resolved';
  report.reviewedBy = req.user._id;
  report.adminAction = action;
  report.actionReason = actionReason;
  report.actionDate = new Date();
  await report.save();

  // Take action based on type
  let actionMessage = '';

  switch (action) {
    case 'warn':
      // Just notify the user
      await Notification.create({
        user: report.reportedUser._id,
        type: 'admin_action',
        content: `تحذير من الإدارة: ${actionReason}`,
        priority: 'high',
        metadata: {
          reportId: report._id
        }
      });
      actionMessage = 'User warned successfully';
      break;

    case 'suspend':
      // Suspend user (duration will be specified separately)
      await User.findByIdAndUpdate(report.reportedUser._id, {
        isSuspended: true,
        suspensionReason: actionReason,
        suspendedUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days default
      });

      await Notification.create({
        user: report.reportedUser._id,
        type: 'admin_action',
        content: `تم تعليق حسابك: ${actionReason}`,
        priority: 'urgent',
        metadata: {
          reportId: report._id
        }
      });

      actionMessage = 'User suspended successfully';
      break;

    case 'ban':
      // Permanent ban
      await User.findByIdAndUpdate(report.reportedUser._id, {
        isSuspended: true,
        suspensionReason: actionReason,
        suspendedUntil: null,
        isActive: false
      });

      await Notification.create({
        user: report.reportedUser._id,
        type: 'admin_action',
        content: `تم حظر حسابك نهائياً: ${actionReason}`,
        priority: 'urgent',
        metadata: {
          reportId: report._id
        }
      });

      actionMessage = 'User banned permanently';
      break;

    case 'delete_content':
      // Delete reported content
      if (report.reportedChallenge) {
        await Challenge.findByIdAndUpdate(report.reportedChallenge, {
          status: 'cancelled'
        });
        actionMessage = 'Challenge cancelled';
      } else if (report.reportedComment) {
        await Comment.findByIdAndUpdate(report.reportedComment, {
          isDeleted: true
        });
        actionMessage = 'Comment deleted';
      }

      await Notification.create({
        user: report.reportedUser._id,
        type: 'admin_action',
        content: `تم حذف محتواك: ${actionReason}`,
        priority: 'high',
        metadata: {
          reportId: report._id
        }
      });
      break;

    case 'cancel_challenge':
      if (report.reportedChallenge) {
        await Challenge.findByIdAndUpdate(report.reportedChallenge, {
          status: 'cancelled'
        });
        actionMessage = 'Challenge cancelled';
      }
      break;

    case 'none':
      report.status = 'dismissed';
      await report.save();
      actionMessage = 'Report dismissed (no action taken)';
      break;
  }

  // Notify reporter about action taken
  await Notification.create({
    user: report.reporter,
    type: 'report_update',
    content: `تم اتخاذ إجراء بشأن بلاغك ضد ${report.reportedUser.username}`,
    link: `/reports/${report._id}`,
    metadata: {
      reportId: report._id
    }
  });

  logger.info(`Admin action taken: ${action} on report ${report._id} by ${req.user.username}`);

  res.status(200).json({
    success: true,
    message: actionMessage,
    data: {
      report: {
        id: report._id,
        status: report.status,
        reviewedBy: req.user.username,
        adminAction: report.adminAction,
        actionReason: report.actionReason,
        actionDate: report.actionDate
      },
      affectedUser: {
        id: report.reportedUser._id,
        username: report.reportedUser.username,
        isSuspended: action === 'suspend' || action === 'ban'
      }
    }
  });
});

// ============================================
// USER MANAGEMENT
// ============================================

/**
 * @desc    Get all users
 * @route   GET /api/v1/admin/users
 * @access  Private (Admin only)
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const {
    search,
    role,
    isSuspended,
    reportCount,
    page = 1,
    limit = 50,
    sort = 'createdAt'
  } = req.query;

  // Build query
  const query = {};

  if (search) {
    query.$or = [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  if (role) query.role = role;
  
  if (isSuspended !== undefined) {
    query.isSuspended = isSuspended === 'true';
  }

  if (reportCount) {
    query.reportCount = { $gte: parseInt(reportCount) };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 100);

  // Get users
  const users = await User.find(query)
    .select('-passwordHash -youtubeAccessToken -youtubeRefreshToken -bankDetails')
    .sort(`-${sort}`)
    .skip(skip)
    .limit(maxLimit);

  const total = await User.countDocuments(query);

  // Get stats
  const stats = {
    totalUsers: await User.countDocuments(),
    activeUsers: await User.countDocuments({ isActive: true, isSuspended: false }),
    suspendedUsers: await User.countDocuments({ isSuspended: true })
  };

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      },
      stats
    }
  });
});

/**
 * @desc    Suspend user
 * @route   PUT /api/v1/admin/users/:id/suspend
 * @access  Private (Admin only)
 */
exports.suspendUser = asyncHandler(async (req, res, next) => {
  const { duration, reason } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      }
    });
  }

  // Cannot suspend admin
  if (user.role === 'admin') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CANNOT_SUSPEND_ADMIN',
        message: 'Cannot suspend admin users'
      }
    });
  }

  // Calculate suspension end date
  const suspendedUntil = duration > 0 
    ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
    : null; // null = permanent

  // Update user
  user.isSuspended = true;
  user.suspensionReason = reason;
  user.suspendedUntil = suspendedUntil;
  await user.save();

  // Notify user
  await Notification.create({
    user: user._id,
    type: 'admin_action',
    content: duration > 0 
      ? `تم تعليق حسابك لمدة ${duration} يوم: ${reason}`
      : `تم تعليق حسابك بشكل دائم: ${reason}`,
    priority: 'urgent'
  });

  logger.info(`User suspended: ${user.username} by ${req.user.username} for ${duration} days`);

  res.status(200).json({
    success: true,
    message: 'User suspended successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        isSuspended: user.isSuspended,
        suspendedUntil: user.suspendedUntil,
        suspensionReason: user.suspensionReason
      }
    }
  });
});

/**
 * @desc    Unsuspend user
 * @route   PUT /api/v1/admin/users/:id/unsuspend
 * @access  Private (Admin only)
 */
exports.unsuspendUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      }
    });
  }

  if (!user.isSuspended) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'USER_NOT_SUSPENDED',
        message: 'User is not suspended'
      }
    });
  }

  // Update user
  user.isSuspended = false;
  user.suspensionReason = null;
  user.suspendedUntil = null;
  await user.save();

  // Notify user
  await Notification.create({
    user: user._id,
    type: 'admin_action',
    content: 'تم إلغاء تعليق حسابك. يمكنك الآن استخدام المنصة بشكل طبيعي.',
    priority: 'medium'
  });

  logger.info(`User unsuspended: ${user.username} by ${req.user.username}`);

  res.status(200).json({
    success: true,
    message: 'User unsuspended successfully'
  });
});

// ============================================
// FILE: controllers/admin.controller.js
// Admin Controller - Part 2 (Ads & Analytics)
// APPEND THIS TO PART 1
// ============================================

// ============================================
// ADVERTISEMENT MANAGEMENT
// ============================================

/**
 * @desc    List advertisements
 * @route   GET /api/v1/admin/ads
 * @access  Private (Admin only)
 */
exports.listAdvertisements = asyncHandler(async (req, res, next) => {
  const {
    status,
    assignedChallenge,
    page = 1,
    limit = 20
  } = req.query;

  // Build query
  const query = {};
  if (status) query.status = status;
  if (assignedChallenge) query.assignedChallenge = assignedChallenge;

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const maxLimit = Math.min(parseInt(limit), 50);

  // Get ads
  const advertisements = await Advertisement.find(query)
    .populate('assignedChallenge', 'title category scheduledTime')
    .populate('createdBy', 'username')
    .populate('rejectedBy', 'username')
    .sort('-createdAt')
    .skip(skip)
    .limit(maxLimit);

  const total = await Advertisement.countDocuments(query);

  // Get stats
  const stats = {
    totalRevenue: await Advertisement.aggregate([
      { $match: { status: 'displayed' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } }
    ]).then(result => result[0]?.total || 0),
    pending: await Advertisement.countDocuments({ status: 'pending' }),
    assigned: await Advertisement.countDocuments({ status: 'assigned' }),
    displayed: await Advertisement.countDocuments({ status: 'displayed' }),
    rejected: await Advertisement.countDocuments({ status: 'rejected' })
  };

  res.status(200).json({
    success: true,
    data: {
      advertisements,
      pagination: {
        page: parseInt(page),
        limit: maxLimit,
        total,
        pages: Math.ceil(total / maxLimit)
      },
      stats
    }
  });
});

/**
 * @desc    Create advertisement
 * @route   POST /api/v1/admin/ads
 * @access  Private (Admin only)
 */
exports.createAdvertisement = asyncHandler(async (req, res, next) => {
  const {
    advertiser,
    advertiserContact,
    content,
    paidAmount
  } = req.body;

  // Calculate duration based on paid amount
  // Formula: $5 per minute of display time
  const calculatedDuration = Math.floor((paidAmount / 5) * 60); // in seconds

  // Create advertisement
  const advertisement = await Advertisement.create({
    advertiser,
    advertiserContact: advertiserContact || {},
    content,
    paidAmount,
    calculatedDuration,
    status: 'pending',
    createdBy: req.user._id
  });

  logger.info(`Advertisement created: ${advertiser} - $${paidAmount} by ${req.user.username}`);

  res.status(201).json({
    success: true,
    message: 'Advertisement created successfully',
    data: {
      advertisement: {
        id: advertisement._id,
        advertiser: advertisement.advertiser,
        paidAmount: advertisement.paidAmount,
        calculatedDuration: advertisement.calculatedDuration,
        status: advertisement.status,
        createdAt: advertisement.createdAt
      }
    }
  });
});

/**
 * @desc    Assign advertisement to challenge
 * @route   PUT /api/v1/admin/ads/:id/assign
 * @access  Private (Admin only)
 */
exports.assignAdvertisement = asyncHandler(async (req, res, next) => {
  const { challengeId, displayTime } = req.body;

  // Get advertisement
  const advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'AD_NOT_FOUND',
        message: 'Advertisement not found'
      }
    });
  }

  if (advertisement.status !== 'pending') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'AD_ALREADY_ASSIGNED',
        message: 'Advertisement is already assigned or used'
      }
    });
  }

  // Get challenge
  const challenge = await Challenge.findById(challengeId);

  if (!challenge) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'CHALLENGE_NOT_FOUND',
        message: 'Challenge not found'
      }
    });
  }

  // Check if challenge is scheduled or live
  if (!['scheduled', 'live'].includes(challenge.status)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_CHALLENGE_STATUS',
        message: 'Can only assign ads to scheduled or live challenges'
      }
    });
  }

  // Validate display time
  const displayTimeDate = new Date(displayTime);
  const challengeStart = challenge.scheduledTime || challenge.startedAt;
  const challengeEnd = new Date(challengeStart.getTime() + challenge.rules.duration * 60 * 1000);

  if (displayTimeDate < challengeStart || displayTimeDate > challengeEnd) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_DISPLAY_TIME',
        message: 'Display time must be during the challenge'
      }
    });
  }

  // Update advertisement
  advertisement.status = 'assigned';
  advertisement.assignedChallenge = challengeId;
  advertisement.displayTime = displayTimeDate;
  await advertisement.save();

  // Add to challenge's advertisements array
  challenge.advertisements.push({
    adId: advertisement._id,
    displayTime: displayTimeDate,
    displayDuration: advertisement.calculatedDuration,
    status: 'pending'
  });
  await challenge.save();

  logger.info(`Ad assigned: ${advertisement.advertiser} to challenge ${challenge.title}`);

  res.status(200).json({
    success: true,
    message: 'Advertisement assigned successfully',
    data: {
      advertisement: {
        id: advertisement._id,
        status: advertisement.status,
        assignedChallenge: challengeId,
        displayTime: advertisement.displayTime
      }
    }
  });
});

// ============================================
// PLATFORM ANALYTICS
// ============================================

/**
 * @desc    Get platform analytics
 * @route   GET /api/v1/admin/analytics
 * @access  Private (Admin only)
 */
exports.getPlatformAnalytics = asyncHandler(async (req, res, next) => {
  const { timeframe = '30d' } = req.query;

  // Calculate date range
  let startDate;
  switch (timeframe) {
    case '7d':
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(0); // All time
  }

  // User statistics
  const totalUsers = await User.countDocuments();
  const newUsers = await User.countDocuments({ 
    createdAt: { $gte: startDate } 
  });
  const activeUsers = await User.countDocuments({ 
    isActive: true, 
    isSuspended: false 
  });
  const suspendedUsers = await User.countDocuments({ 
    isSuspended: true 
  });

  // Challenge statistics
  const totalChallenges = await Challenge.countDocuments();
  const completedChallenges = await Challenge.countDocuments({ 
    status: 'completed',
    endedAt: { $gte: startDate }
  });
  const liveChallenges = await Challenge.countDocuments({ 
    status: 'live' 
  });
  const scheduledChallenges = await Challenge.countDocuments({ 
    status: 'scheduled' 
  });
  const cancelledChallenges = await Challenge.countDocuments({ 
    status: 'cancelled',
    updatedAt: { $gte: startDate }
  });

  // Revenue statistics
  const revenueData = await Transaction.aggregate([
    {
      $match: {
        type: 'challenge_earning',
        status: 'completed',
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' }
      }
    }
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;
  const platformShare = totalRevenue * 0.20;
  const competitorsShare = totalRevenue * 0.80;

  // Advertisement statistics
  const totalAds = await Advertisement.countDocuments();
  const displayedAds = await Advertisement.countDocuments({ 
    status: 'displayed' 
  });
  const rejectedAds = await Advertisement.countDocuments({ 
    status: 'rejected' 
  });

  const adRevenueData = await Advertisement.aggregate([
    {
      $match: {
        status: 'displayed',
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalAdRevenue: { $sum: '$paidAmount' }
      }
    }
  ]);

  const totalAdRevenue = adRevenueData[0]?.totalAdRevenue || 0;

  // Engagement statistics
  const totalRatings = await Rating.countDocuments({
    timestamp: { $gte: startDate }
  });

  const totalComments = await Comment.countDocuments({
    timestamp: { $gte: startDate }
  });

  // Average viewers per challenge
  const viewerData = await Challenge.aggregate([
    {
      $match: {
        status: 'completed',
        endedAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        avgViewers: { $avg: '$peakViewers' }
      }
    }
  ]);

  const averageViewersPerChallenge = Math.round(viewerData[0]?.avgViewers || 0);

  // Report statistics
  const totalReports = await Report.countDocuments({
    createdAt: { $gte: startDate }
  });
  const resolvedReports = await Report.countDocuments({
    status: 'resolved',
    updatedAt: { $gte: startDate }
  });
  const pendingReports = await Report.countDocuments({
    status: 'pending'
  });

  res.status(200).json({
    success: true,
    data: {
      timeframe,
      users: {
        total: totalUsers,
        new: newUsers,
        active: activeUsers,
        suspended: suspendedUsers
      },
      challenges: {
        total: totalChallenges,
        completed: completedChallenges,
        live: liveChallenges,
        scheduled: scheduledChallenges,
        cancelled: cancelledChallenges
      },
      revenue: {
        totalGenerated: totalRevenue,
        platformShare,
        competitorsShare,
        averagePerChallenge: completedChallenges > 0 
          ? (totalRevenue / completedChallenges).toFixed(2) 
          : 0
      },
      advertisements: {
        total: totalAds,
        displayed: displayedAds,
        rejected: rejectedAds,
        totalRevenue: totalAdRevenue
      },
      engagement: {
        totalRatings,
        totalComments,
        averageViewersPerChallenge
      },
      reports: {
        total: totalReports,
        resolved: resolvedReports,
        pending: pendingReports
      }
    }
  });
});

// Don't forget to export at the end of the file
// (This should be added to the existing module.exports)

module.exports = exports;
