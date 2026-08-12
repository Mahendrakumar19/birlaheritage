const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const env      = require('../config/env');
const AdminUser = require('../models/AdminUser');
const asyncHandler = require('../middleware/asyncHandler');
const { authRateLimit } = require('../middleware/sensitiveRateLimits');
const {
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} = require('../utils/authCookies');

const router = express.Router();

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role, type: 'access' },
    env.jwtSecret,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: user.id, type: 'refresh' },
    env.jwtRefreshSecret,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

function issueSession(res, user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);
}

function publicUser(user) {
  return {
    id:        user.id,
    username:  user.username,
    email:     user.email,
    fullName:  user.fullName,
    role:      user.role,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
  };
}

/* ─── POST /api/auth/signup ────────────────────────────────────────────────── */
router.post('/signup', authRateLimit, asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body || {};
  const existingAdminCount = AdminUser.countAll();

  if (!env.allowAdminSignup) {
    return res.status(403).json({
      success: false,
      message: 'Admin signup is disabled. Use the secure admin bootstrap procedure.',
    });
  }

  if (existingAdminCount > 0) {
    return res.status(403).json({
      success: false,
      message: 'Bootstrap is complete. Only a super administrator can create additional users.',
    });
  }

  if (
    env.bootstrapAdminToken &&
    req.header('x-bootstrap-token') !== env.bootstrapAdminToken
  ) {
    return res.status(403).json({
      success: false,
      message: 'A valid bootstrap token is required',
    });
  }

  // Validation
  const errors = [];
  if (!username || username.trim().length < 3)
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
  if (username && username.trim().length > 30)
    errors.push({ field: 'username', message: 'Username must be 30 characters or fewer' });
  if (!/^[a-zA-Z0-9._-]+$/.test(username || ''))
    errors.push({ field: 'username', message: 'Username can only contain letters, numbers, dots, hyphens, underscores' });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push({ field: 'email', message: 'Valid email is required' });

  if (!password || password.length < 12)
    errors.push({ field: 'password', message: 'Password must be at least 12 characters' });
  if (password && !/[A-Z]/.test(password))
    errors.push({ field: 'password', message: 'Password must include an uppercase letter' });
  if (password && !/[a-z]/.test(password))
    errors.push({ field: 'password', message: 'Password must include a lowercase letter' });
  if (password && !/\d/.test(password))
    errors.push({ field: 'password', message: 'Password must include a number' });
  if (password && !/[^A-Za-z0-9]/.test(password))
    errors.push({ field: 'password', message: 'Password must include a special character' });
  if (password && password.length > 128)
    errors.push({ field: 'password', message: 'Password too long (max 128 characters)' });

  if (errors.length) {
    return res.status(422).json({ success: false, message: 'Validation failed', errors });
  }

  // Check for duplicates
  const existingByUsername = AdminUser.findByUsername(username.trim());
  if (existingByUsername) {
    return res.status(409).json({ success: false, message: 'Username already taken', errors: [{ field: 'username', message: 'This username is already in use' }] });
  }

  const existingByEmail = AdminUser.findByEmail(email.trim());
  if (existingByEmail) {
    return res.status(409).json({ success: false, message: 'Email already registered', errors: [{ field: 'email', message: 'An account with this email already exists' }] });
  }

  // Hash password & create user
  const passwordHash = await bcrypt.hash(password, 12);
  const user = AdminUser.create({
    username:     username.trim(),
    email:        email.trim().toLowerCase(),
    passwordHash,
    fullName:     fullName?.trim() || null,
    role:         'super_admin',
  });

  issueSession(res, user);
  AdminUser.updateLastLogin(user.id);

  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    user: publicUser(user),
  });
}));

/* ─── POST /api/auth/login ─────────────────────────────────────────────────── */
router.post('/login', authRateLimit, asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  // Look up by username OR email
  const user = AdminUser.findByUsername(username.trim())
            || AdminUser.findByEmail(username.trim());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'Account is disabled. Contact system administrator.' });
  }

  // Verify password
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  issueSession(res, user);
  AdminUser.updateLastLogin(user.id);

  return res.json({
    success: true,
    message: 'Login successful',
    user: publicUser(user),
  });
}));

/* ─── POST /api/auth/verify ────────────────────────────────────────────────── */
router.post('/verify', asyncHandler(async (req, res) => {
  const authHeader = req.header('authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : getAccessToken(req) || req.header('x-api-key') || (req.body || {}).token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (payload.type !== 'access') throw new Error('Invalid token type');
    const user = AdminUser.findById(payload.sub);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Session invalid or account disabled' });
    }
    return res.json({ success: true, message: 'Session valid', user: publicUser(user) });
  } catch {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
}));

/* ─── GET /api/auth/me ─────────────────────────────────────────────────────── */
router.get('/me', asyncHandler(async (req, res) => {
  const authHeader = req.header('authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : getAccessToken(req);

  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (payload.type !== 'access') throw new Error('Invalid token type');
    const user = AdminUser.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    return res.json({ success: true, user: publicUser(user) });
  } catch {
    return res.status(401).json({ success: false, message: 'Token expired' });
  }
}));

/* ─── POST /api/auth/refresh ─────────────────────────────────────────────── */
router.post('/refresh', authRateLimit, asyncHandler(async (req, res) => {
  const refreshToken = getRefreshToken(req);
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh session missing' });
  }

  try {
    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
    if (payload.type !== 'refresh') throw new Error('Invalid token type');
    const user = AdminUser.findById(payload.sub);
    if (!user || !user.isActive) {
      clearAuthCookies(res);
      return res.status(401).json({ success: false, message: 'Session invalid' });
    }
    issueSession(res, user);
    return res.json({ success: true, user: publicUser(user) });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ success: false, message: 'Refresh session expired or invalid' });
  }
}));

/* ─── POST /api/auth/logout ──────────────────────────────────────────────── */
router.post('/logout', (req, res) => {
  clearAuthCookies(res);
  return res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
