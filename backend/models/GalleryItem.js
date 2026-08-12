const { run, get, all, lastInsertId, persist } = require('../config/db');

const VALID_COLLECTIONS = ['campus', 'students-corner'];

const SELECT_FIELDS = `
  id,
  collection,
  title,
  description,
  image_path  AS imagePath,
  alt_text    AS altText,
  sort_order  AS sortOrder,
  is_active   AS isActive,
  created_at  AS createdAt,
  updated_at  AS updatedAt
`;

/**
 * Create a new gallery item
 * @param {object} payload
 * @returns {object} created record
 */
function create(payload) {
  if (!VALID_COLLECTIONS.includes(payload.collection)) {
    throw new Error(`Invalid collection. Must be one of: ${VALID_COLLECTIONS.join(', ')}`);
  }

  // Auto-assign sort_order = max in collection + 1
  const maxRow = get(
    `SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM gallery_items WHERE collection = ?`,
    [payload.collection]
  );
  const sortOrder = (maxRow?.maxOrder ?? -1) + 1;

  run(
    `INSERT INTO gallery_items
      (collection, title, description, image_path, alt_text, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.collection,
      payload.title,
      payload.description || null,
      payload.imagePath,
      payload.altText || null,
      payload.sortOrder !== undefined ? Number(payload.sortOrder) : sortOrder,
      payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1,
    ]
  );

  const id = lastInsertId();
  persist();
  return findById(id);
}

/**
 * Find single gallery item by id
 */
function findById(id) {
  return get(
    `SELECT ${SELECT_FIELDS} FROM gallery_items WHERE id = ?`,
    [Number(id)]
  );
}

/**
 * List gallery items with optional filters
 */
function list({ collection, isActive, limit = 50, offset = 0 } = {}) {
  const safeLimit  = Math.min(Math.max(Number(limit)  || 50,  1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const conditions = [];
  const params     = [];

  if (collection) {
    conditions.push('collection = ?');
    params.push(collection);
  }
  if (isActive !== undefined && isActive !== null) {
    conditions.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  return all(
    `SELECT ${SELECT_FIELDS}
     FROM gallery_items
     ${where}
     ORDER BY sort_order ASC, datetime(created_at) DESC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

/**
 * Count gallery items (for pagination meta)
 */
function count({ collection, isActive } = {}) {
  const conditions = [];
  const params     = [];

  if (collection) {
    conditions.push('collection = ?');
    params.push(collection);
  }
  if (isActive !== undefined && isActive !== null) {
    conditions.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const row = get(`SELECT COUNT(*) AS total FROM gallery_items ${where}`, params);
  return Number(row?.total || 0);
}

/**
 * Update gallery item metadata (title, description, alt_text)
 */
function update(id, payload) {
  const existing = findById(id);
  if (!existing) return null;

  const fields = [];
  const params = [];

  if (payload.title !== undefined)       { fields.push('title = ?');       params.push(payload.title); }
  if (payload.description !== undefined) { fields.push('description = ?'); params.push(payload.description || null); }
  if (payload.altText !== undefined)     { fields.push('alt_text = ?');    params.push(payload.altText || null); }
  if (payload.sortOrder !== undefined)   { fields.push('sort_order = ?');  params.push(Number(payload.sortOrder)); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE gallery_items SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

/**
 * Toggle is_active flag
 */
function toggleActive(id) {
  const existing = findById(id);
  if (!existing) return null;

  const newVal = existing.isActive ? 0 : 1;
  run(
    `UPDATE gallery_items SET is_active = ?, updated_at = datetime('now') WHERE id = ?`,
    [newVal, Number(id)]
  );
  persist();
  return findById(id);
}

/**
 * Bulk reorder: accept array of { id, sortOrder }
 */
function reorder(items) {
  for (const item of items) {
    if (!item.id || item.sortOrder === undefined) continue;
    run(
      `UPDATE gallery_items SET sort_order = ?, updated_at = datetime('now') WHERE id = ?`,
      [Number(item.sortOrder), Number(item.id)]
    );
  }
  persist();
}

/**
 * Hard-delete a gallery item, returns image_path so caller can clean up file
 */
function remove(id) {
  const existing = findById(id);
  if (!existing) return null;
  run('DELETE FROM gallery_items WHERE id = ?', [Number(id)]);
  persist();
  return existing; // caller uses imagePath to delete file
}

module.exports = {
  create,
  findById,
  list,
  count,
  update,
  toggleActive,
  reorder,
  remove,
  VALID_COLLECTIONS,
};
