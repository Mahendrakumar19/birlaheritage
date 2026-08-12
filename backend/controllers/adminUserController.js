const adminUserService = require('../services/adminUserService');
const asyncHandler = require('../middleware/asyncHandler');

const listUsers = asyncHandler(async (req, res) => {
  const { items, total } = adminUserService.listUsers(req.query);
  return res.json({
    success: true,
    data: items,
    meta: { total },
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, role = 'viewer' } = req.body || {};
  const errors = [];
  if (!username || username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!password || password.length < 12) {
    errors.push({ field: 'password', message: 'Password must be at least 12 characters' });
  }
  if (errors.length) {
    return res.status(422).json({ success: false, message: 'Validation failed', errors });
  }

  const result = await adminUserService.createUser({
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password,
    fullName: fullName?.trim(),
    role,
  });
  if (result.conflict) {
    return res.status(409).json({ success: false, message: 'Username or email already exists' });
  }
  if (result.invalid) {
    return res.status(422).json({ success: false, message: result.invalid });
  }
  return res.status(201).json({ success: true, data: result.created });
});

const updateUser = asyncHandler(async (req, res) => {
  const result = adminUserService.updateUserAccess(req.adminUser, req.params.id, {
    role: req.body?.role,
    isActive: req.body?.isActive,
  });
  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Admin user not found' });
  }
  if (result.invalid) {
    return res.status(422).json({ success: false, message: result.invalid });
  }
  return res.json({ success: true, data: result.updated });
});

module.exports = { listUsers, createUser, updateUser };
