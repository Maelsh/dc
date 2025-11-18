

// ============================================
// FILE: middleware/validate.js
// Request Validation Middleware
// ============================================

const { validationResult } = require('express-validator');

/**
 * Validate request using express-validator rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value
    }));

    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: extractedErrors
      }
    });
  }

  next();
};

module.exports = { validate };
