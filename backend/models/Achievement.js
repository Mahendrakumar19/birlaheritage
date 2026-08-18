const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  student_name     AS studentName,
  grade,
  title,
  category,
  achievement_date AS achievementDate,
  description,
  image_path       AS imagePath,
  is_published     AS isPublished,
  sort_order       AS sortOrder,
  created_at       AS createdAt,
  updated_at       AS updatedAt
`;

function listPublished() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM achievements
     WHERE is_published = 1
     ORDER BY datetime(achievement_date) DESC, sort_order ASC`
  );
}

function findById(id) {
  return get(`SELECT ${SELECT_FIELDS} FROM achievements WHERE id = ?`, [Number(id)]);
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
     FROM achievements
     ${where}
     ORDER BY datetime(achievement_date) DESC, sort_order ASC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

function create(payload) {
  run(
    `INSERT INTO achievements
       (student_name, grade, title, category, achievement_date, description, image_path, is_published, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.studentName,
      payload.grade || 'N/A',
      payload.title,
      payload.category || 'Academic',
      payload.achievementDate || new Date().toISOString().split('T')[0],
      payload.description || '',
      payload.imagePath || null,
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

  if (payload.studentName !== undefined) { fields.push('student_name = ?'); params.push(payload.studentName); }
  if (payload.grade !== undefined) { fields.push('grade = ?'); params.push(payload.grade); }
  if (payload.title !== undefined) { fields.push('title = ?'); params.push(payload.title); }
  if (payload.category !== undefined) { fields.push('category = ?'); params.push(payload.category); }
  if (payload.achievementDate !== undefined) { fields.push('achievement_date = ?'); params.push(payload.achievementDate); }
  if (payload.description !== undefined) { fields.push('description = ?'); params.push(payload.description); }
  if (payload.imagePath !== undefined) { fields.push('image_path = ?'); params.push(payload.imagePath); }
  if (payload.isPublished !== undefined) { fields.push('is_published = ?'); params.push(payload.isPublished ? 1 : 0); }
  if (payload.sortOrder !== undefined) { fields.push('sort_order = ?'); params.push(Number(payload.sortOrder)); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE achievements SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

function togglePublished(id) {
  const existing = findById(id);
  if (!existing) return null;
  const newVal = existing.isPublished ? 0 : 1;
  run(`UPDATE achievements SET is_published = ?, updated_at = datetime('now') WHERE id = ?`, [newVal, Number(id)]);
  persist();
  return findById(id);
}

function remove(id) {
  const existing = findById(id);
  if (!existing) return false;
  run('DELETE FROM achievements WHERE id = ?', [Number(id)]);
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
