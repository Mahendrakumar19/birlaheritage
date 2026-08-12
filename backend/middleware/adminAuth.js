const jwt = require('jsonwebtoken');
const env  = require('../config/env');
const AdminUser = require('../models/AdminUser');
const { getAccessToken } = require('../utils/authCookies');

/**
 * Accepts either:
 *   1. A valid JWT in the Authorization: Bearer <token> header
 *   2. A valid JWT in the x-api-key header
 *   3. The raw ADMIN_API_KEY string (legacy / seed scripts)
 */
function adminAuth(req, res, next) {
  const authHeader = req.header('authorization') || '';
  const rawKey     = req.header('x-api-key') || '';

  // Extract bearer token (from header or x-api-key)
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : getAccessToken(req) || rawKey || null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Provide an Authorization: Bearer <token> or x-api-key header.',
    });
  }

  // ── 1. Try JWT verify ──────────────────────────────────────────────────────
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (payload.type !== 'access') throw new Error('Invalid token type');
    const user    = AdminUser.findById(payload.sub);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Account not found or disabled' });
    }
    req.adminUser = user; // attach user to request
    return next();
  } catch (jwtErr) {
    // Not a JWT — fall through to legacy key check
  }

  // ── 2. Fallback: raw ADMIN_API_KEY (legacy / Postman testing) ─────────────
  if (env.isDev && env.adminApiKey && token === env.adminApiKey) {
    req.adminUser = { id: 0, username: 'api-key-user', role: 'super_admin' };
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Token invalid or expired.',
  });
}

module.exports = adminAuth;
