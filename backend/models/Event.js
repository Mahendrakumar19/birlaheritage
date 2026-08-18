const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  title,
  category,
  event_date        AS eventDate,
  short_description AS shortDescription,
  description,
  cover_image       AS coverImage,
  gallery_album_id  AS galleryAlbumId,
  is_published      AS isPublished,
  sort_order        AS sortOrder,
  created_at        AS createdAt,
  updated_at        AS updatedAt
`;

function listPublished() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM events
     WHERE is_published = 1
     ORDER BY datetime(event_date) DESC, sort_order ASC`
  );
}

function findById(id) {
  return get(`SELECT ${SELECT_FIELDS} FROM events WHERE id = ?`, [Number(id)]);
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
     FROM events
     ${where}
     ORDER BY datetime(event_date) DESC, sort_order ASC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

function create(payload) {
  run(
    `INSERT INTO events
       (title, category, event_date, short_description, description, cover_image, gallery_album_id, is_published, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.title,
      payload.category || 'Cultural',
      payload.eventDate || new Date().toISOString().split('T')[0],
      payload.shortDescription || '',
      payload.description || '',
      payload.coverImage || null,
      payload.galleryAlbumId || null,
      payload.isPublished !== undefined ? (payload.isPublished ? 1 : 0) : 1,
      payload.sortOrder !== undefined ? Number(payload.sortOrder) : 0,
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

  if (payload.title !== undefined) { fields.push('title = ?'); params.push(payload.title); }
  if (payload.category !== undefined) { fields.push('category = ?'); params.push(payload.category); }
  if (payload.eventDate !== undefined) { fields.push('event_date = ?'); params.push(payload.eventDate); }
  if (payload.shortDescription !== undefined) { fields.push('short_description = ?'); params.push(payload.shortDescription); }
  if (payload.description !== undefined) { fields.push('description = ?'); params.push(payload.description); }
  if (payload.coverImage !== undefined) { fields.push('cover_image = ?'); params.push(payload.coverImage); }
  if (payload.galleryAlbumId !== undefined) { fields.push('gallery_album_id = ?'); params.push(payload.galleryAlbumId); }
  if (payload.isPublished !== undefined) { fields.push('is_published = ?'); params.push(payload.isPublished ? 1 : 0); }
  if (payload.sortOrder !== undefined) { fields.push('sort_order = ?'); params.push(Number(payload.sortOrder)); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE events SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

function togglePublished(id) {
  const existing = findById(id);
  if (!existing) return null;
  const newVal = existing.isPublished ? 0 : 1;
  run(`UPDATE events SET is_published = ?, updated_at = datetime('now') WHERE id = ?`, [newVal, Number(id)]);
  persist();
  return findById(id);
}

function remove(id) {
  const existing = findById(id);
  if (!existing) return false;
  run('DELETE FROM events WHERE id = ?', [Number(id)]);
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
