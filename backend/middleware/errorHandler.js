const env = require('../config/env');
const logger = require('../utils/logger');

function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal server error',
    requestId: req.requestId,
  };

  if (err.errors) {
    payload.errors = err.errors;
  }

  if (env.isDev && status >= 500) {
    payload.stack = err.stack;
  }

  if (status >= 500) {
    logger.error('unhandled_request_error', {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      error: {
        name: err.name,
        message: err.message,
        stack: env.isDev ? err.stack : undefined,
      },
    });
  }

  res.status(status).json(payload);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
