// ============================================
// FILE: middleware/auth.js
// Authentication & Authorization Middleware
// ============================================

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../config/logger');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Alternative: Get token from Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authorized to access this route. Please login.'
        }
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.userId).select('-passwordHash');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User no longer exists'
          }
        });
      }

      // Check if user is suspended
      if (user.isSuspended) {
        const message = user.suspendedUntil 
          ? `Account suspended until ${user.suspendedUntil.toISOString()}. Reason: ${user.suspensionReason}`
          : `Account permanently suspended. Reason: ${user.suspensionReason}`;
        
        return res.status(403).json({
          success: false,
          error: {
            code: 'ACCOUNT_SUSPENDED',
            message
          }
        });
      }

      // Attach user to request
      req.user = user;
      
      next();
    } catch (err) {
      logger.error('JWT verification error:', err);
      
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token is invalid or expired'
        }
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Authentication error'
      }
    });
  }
};

/**
 * Optional authentication - Does not fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-passwordHash');
        
        if (user && !user.isSuspended) {
          req.user = user;
        }
      } catch (err) {
        // Token invalid, continue without user
        logger.debug('Optional auth: Invalid token');
      }
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * Restrict to admin role only
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Admin access required'
      }
    });
  }

  next();
};

/**
 * Restrict admin from user actions (ratings, comments, messages)
 */
const restrictAdminActions = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    const restrictedPaths = ['/ratings', '/comments', '/messages'];
    
    if (restrictedPaths.some(path => req.originalUrl.includes(path))) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'ADMIN_RESTRICTION',
          message: 'Admins cannot perform user interaction functions (ratings, comments, messaging)'
        }
      });
    }
  }

  next();
};

/**
 * Check if user owns resource or is admin
 */
const ownerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }

    const isOwner = req.user._id.toString() === resourceUserId.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Not authorized to access this resource'
        }
      });
    }

    next();
  };
};

module.exports = {
  protect,
  optionalAuth,
  adminOnly,
  restrictAdminActions,
  ownerOrAdmin
};