const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  name,
  designation,
  role_tag       AS roleTag,
  image_path     AS imagePath,
  bio,
  message,
  sort_order     AS sortOrder,
  is_placeholder AS isPlaceholder,
  is_published   AS isPublished,
  created_at     AS createdAt,
  updated_at     AS updatedAt
`;

function listPublished() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM leadership_profiles
     WHERE is_published = 1
     ORDER BY sort_order ASC, id ASC`
  );
}

function findById(id) {
  return get(`SELECT ${SELECT_FIELDS} FROM leadership_profiles WHERE id = ?`, [Number(id)]);
}

function list({ isPublished, limit = 50, offset = 0 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const conditions = [];
  const params = [];

  if (isPublished !== undefined && isPublished !== null) {
    conditions.push('is_published = ?');
    params.push(isPublished ? 1 : 0);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  return all(
    `SELECT ${SELECT_FIELDS}
     FROM leadership_profiles
     ${where}
     ORDER BY sort_order ASC, id ASC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

function create(payload) {
  run(
    `INSERT INTO leadership_profiles
       (name, designation, role_tag, image_path, bio, message, sort_order, is_placeholder, is_published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.name,
      payload.designation || 'Leader',
      payload.roleTag || "Leadership Office",
      payload.imagePath || '/team_placeholder.jpeg',
      payload.bio || '',
      payload.message || '',
      payload.sortOrder !== undefined ? Number(payload.sortOrder) : 0,
      payload.isPlaceholder !== undefined ? (payload.isPlaceholder ? 1 : 0) : 0,
      payload.isPublished !== undefined ? (payload.isPublished ? 1 : 0) : 1,
    ]
  );
  const id = lastInsertId();
  persist();
  return findById(id);
}

function update(id, payload) {
  const existing = findById(id);
  if (!existing) return null;

  const fields = [];
  const params = [];

  if (payload.name !== undefined) { fields.push('name = ?'); params.push(payload.name); }
  if (payload.designation !== undefined) { fields.push('designation = ?'); params.push(payload.designation); }
  if (payload.roleTag !== undefined) { fields.push('role_tag = ?'); params.push(payload.roleTag); }
  if (payload.imagePath !== undefined) { fields.push('image_path = ?'); params.push(payload.imagePath); }
  if (payload.bio !== undefined) { fields.push('bio = ?'); params.push(payload.bio); }
  if (payload.message !== undefined) { fields.push('message = ?'); params.push(payload.message); }
  if (payload.sortOrder !== undefined) { fields.push('sort_order = ?'); params.push(Number(payload.sortOrder)); }
  if (payload.isPlaceholder !== undefined) { fields.push('is_placeholder = ?'); params.push(payload.isPlaceholder ? 1 : 0); }
  if (payload.isPublished !== undefined) { fields.push('is_published = ?'); params.push(payload.isPublished ? 1 : 0); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE leadership_profiles SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

function togglePublished(id) {
  const existing = findById(id);
  if (!existing) return null;
  const newVal = existing.isPublished ? 0 : 1;
  run(`UPDATE leadership_profiles SET is_published = ?, updated_at = datetime('now') WHERE id = ?`, [newVal, Number(id)]);
  persist();
  return findById(id);
}

function remove(id) {
  const existing = findById(id);
  if (!existing) return false;
  run('DELETE FROM leadership_profiles WHERE id = ?', [Number(id)]);
  persist();
  return true;
}

module.exports = {
  listPublished,
  findById,
  list,
  create,
  update,
  togglePublished,
  remove,
};
