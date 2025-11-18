
// ============================================
// FILE: middleware/notFound.js
// 404 Not Found Handler
// ============================================

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`,
      method: req.method,
      path: req.path
    }
  });
};

module.exports = notFound;