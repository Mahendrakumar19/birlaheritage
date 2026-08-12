const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  name,
  email,
  phone,
  message,
  status,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

const VALID_STATUSES = ['new', 'read', 'replied', 'archived'];

function create(payload, meta = {}) {
  run(
    `INSERT INTO contact_messages (
      name,
      email,
      phone,
      message,
      ip_address,
      user_agent
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      payload.name,
      payload.email,
      payload.phone,
      payload.message,
      meta.ipAddress || null,
      meta.userAgent || null,
    ]
  );

  const id = lastInsertId();
  persist();
  return findById(id);
}

function findById(id) {
  return get(
    `SELECT ${SELECT_FIELDS} FROM contact_messages WHERE id = ?`,
    [Number(id)]
  );
}

function list({ limit = 50, offset = 0, status } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  if (status) {
    return all(
      `SELECT ${SELECT_FIELDS}
       FROM contact_messages
       WHERE status = ?
       ORDER BY datetime(created_at) DESC
       LIMIT ? OFFSET ?`,
      [status, safeLimit, safeOffset]
    );
  }

  return all(
    `SELECT ${SELECT_FIELDS}
     FROM contact_messages
     ORDER BY datetime(created_at) DESC
     LIMIT ? OFFSET ?`,
    [safeLimit, safeOffset]
  );
}

function count({ status } = {}) {
  if (status) {
    const row = get(
      'SELECT COUNT(*) AS total FROM contact_messages WHERE status = ?',
      [status]
    );
    return Number(row?.total || 0);
  }
  const row = get('SELECT COUNT(*) AS total FROM contact_messages');
  return Number(row?.total || 0);
}

/**
 * Update the status of a contact message (CRUD: Update)
 * @param {number} id
 * @param {string} status - one of: new | read | replied | archived
 * @returns {object|undefined} updated record or undefined if not found
 */
function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  run(
    `UPDATE contact_messages
     SET status = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [status, Number(id)]
  );
  persist();
  return findById(id);
}

/**
 * Hard-delete a contact message (CRUD: Delete)
 * @param {number} id
 * @returns {boolean} true if a row was deleted
 */
function remove(id) {
  const existing = findById(id);
  if (!existing) return false;

  run(
    'DELETE FROM contact_messages WHERE id = ?',
    [Number(id)]
  );
  persist();
  return true;
}

module.exports = {
  create,
  findById,
  list,
  count,
  updateStatus,
  remove,
  VALID_STATUSES,
};
