const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');
const { ROLE_PERMISSIONS } = require('../middleware/requireRole');

const ALLOWED_ROLES = Object.freeze(Object.keys(ROLE_PERMISSIONS));

function listUsers(query) {
  const items = AdminUser.list(query);
  return { items, total: AdminUser.countAll() };
}

async function createUser(data) {
  if (!ALLOWED_ROLES.includes(data.role)) {
    return { invalid: 'Invalid role' };
  }
  if (AdminUser.findByUsername(data.username) || AdminUser.findByEmail(data.email)) {
    return { conflict: true };
  }
  const passwordHash = await bcrypt.hash(data.password, 12);
  return {
    created: AdminUser.create({
      username: data.username,
      email: data.email,
      passwordHash,
      fullName: data.fullName,
      role: data.role,
    }),
  };
}

function updateUserAccess(actor, id, data) {
  const target = AdminUser.findById(id);
  if (!target) return { notFound: true };
  if (Number(actor.id) === Number(id) && data.isActive === false) {
    return { invalid: 'You cannot disable your own account' };
  }
  if (data.role !== undefined && !ALLOWED_ROLES.includes(data.role)) {
    return { invalid: 'Invalid role' };
  }
  return { updated: AdminUser.updateAccess(id, data) };
}

module.exports = {
  ALLOWED_ROLES,
  listUsers,
  createUser,
  updateUserAccess,
};
