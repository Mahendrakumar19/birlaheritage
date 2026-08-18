const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  name,
  role,
  quote,
  image_path     AS imagePath,
  rating,
  sort_order     AS sortOrder,
  is_published   AS isPublished,
  created_at     AS createdAt,
  updated_at     AS updatedAt
`;

function listPublished() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM testimonials
     WHERE is_published = 1
     ORDER BY sort_order ASC, id ASC`
  );
}

function findById(id) {
  return get(`SELECT ${SELECT_FIELDS} FROM testimonials WHERE id = ?`, [Number(id)]);
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
     FROM testimonials
     ${where}
     ORDER BY sort_order ASC, id ASC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

function create(payload) {
  run(
    `INSERT INTO testimonials
       (name, role, quote, image_path, rating, sort_order, is_published)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.name,
      payload.role || 'Parent',
      payload.quote || '',
      payload.imagePath || '/parent_avatar_1.png',
      payload.rating !== undefined ? Number(payload.rating) : 5,
      payload.sortOrder !== undefined ? Number(payload.sortOrder) : 0,
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
  if (payload.role !== undefined) { fields.push('role = ?'); params.push(payload.role); }
  if (payload.quote !== undefined) { fields.push('quote = ?'); params.push(payload.quote); }
  if (payload.imagePath !== undefined) { fields.push('image_path = ?'); params.push(payload.imagePath); }
  if (payload.rating !== undefined) { fields.push('rating = ?'); params.push(Number(payload.rating)); }
  if (payload.sortOrder !== undefined) { fields.push('sort_order = ?'); params.push(Number(payload.sortOrder)); }
  if (payload.isPublished !== undefined) { fields.push('is_published = ?'); params.push(payload.isPublished ? 1 : 0); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

function togglePublished(id) {
  const existing = findById(id);
  if (!existing) return null;
  const newVal = existing.isPublished ? 0 : 1;
  run(`UPDATE testimonials SET is_published = ?, updated_at = datetime('now') WHERE id = ?`, [newVal, Number(id)]);
  persist();
  return findById(id);
}

function remove(id) {
  const existing = findById(id);
  if (!existing) return false;
  run('DELETE FROM testimonials WHERE id = ?', [Number(id)]);
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
