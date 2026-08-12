const rateLimit = require('express-rate-limit');

const jsonMessage = (message) => ({
  success: false,
  message,
});

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: jsonMessage('Too many failed authentication attempts. Try again later.'),
});

const publicFormRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage('Too many submissions. Please try again later.'),
});

module.exports = {
  authRateLimit,
  publicFormRateLimit,
};
