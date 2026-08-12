const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  username,
  email,
  full_name   AS fullName,
  role,
  is_active   AS isActive,
  last_login  AS lastLogin,
  created_at  AS createdAt,
  updated_at  AS updatedAt
`;

function findById(id) {
  return get(
    `SELECT ${SELECT_FIELDS} FROM admin_users WHERE id = ?`,
    [Number(id)]
  );
}

function findByUsername(username) {
  return get(
    `SELECT ${SELECT_FIELDS}, password_hash AS passwordHash FROM admin_users WHERE username = ? COLLATE NOCASE`,
    [username]
  );
}

function findByEmail(email) {
  return get(
    `SELECT ${SELECT_FIELDS}, password_hash AS passwordHash FROM admin_users WHERE email = ? COLLATE NOCASE`,
    [email]
  );
}

function countAll() {
  const row = get(`SELECT COUNT(*) AS total FROM admin_users`);
  return Number(row?.total || 0);
}

function list({ limit = 50, offset = 0 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM admin_users
     ORDER BY datetime(created_at) ASC
     LIMIT ? OFFSET ?`,
    [safeLimit, safeOffset]
  );
}

function create({ username, email, passwordHash, fullName, role = 'admin' }) {
  run(
    `INSERT INTO admin_users (username, email, password_hash, full_name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [username.trim(), email.trim().toLowerCase(), passwordHash, fullName || null, role]
  );
  const id = lastInsertId();
  persist();
  return findById(id);
}

function updateLastLogin(id) {
  run(
    `UPDATE admin_users SET last_login = datetime('now'), updated_at = datetime('now') WHERE id = ?`,
    [Number(id)]
  );
  persist();
}

function updateAccess(id, { role, isActive }) {
  const fields = [];
  const params = [];
  if (role !== undefined) {
    fields.push('role = ?');
    params.push(role);
  }
  if (isActive !== undefined) {
    fields.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }
  if (!fields.length) return findById(id);
  fields.push("updated_at = datetime('now')");
  params.push(Number(id));
  run(`UPDATE admin_users SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

module.exports = {
  findById,
  findByUsername,
  findByEmail,
  countAll,
  list,
  create,
  updateLastLogin,
  updateAccess,
};
