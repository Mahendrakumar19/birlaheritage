const crypto = require('crypto');
const logger = require('../utils/logger');

function requestContext(req, res, next) {
  const requestId = req.header('x-request-id') || crypto.randomUUID();
  const startedAt = Date.now();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    logger.info('http_request', {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
      adminUserId: req.adminUser?.id,
    });
  });

  next();
}

module.exports = requestContext;
