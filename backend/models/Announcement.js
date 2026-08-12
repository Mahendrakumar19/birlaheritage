const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  text,
  emoji,
  link_url    AS linkUrl,
  link_label  AS linkLabel,
  priority,
  is_active   AS isActive,
  starts_at   AS startsAt,
  ends_at     AS endsAt,
  created_at  AS createdAt,
  updated_at  AS updatedAt
`;

/**
 * Return only announcements that are currently "live":
 *   - is_active = 1
 *   - starts_at is null OR starts_at <= now
 *   - ends_at   is null OR ends_at   >= now
 * Ordered by priority DESC, then newest first.
 */
function findActive() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM announcements
     WHERE is_active = 1
       AND (starts_at IS NULL OR datetime(starts_at) <= datetime('now'))
       AND (ends_at   IS NULL OR datetime(ends_at)   >= datetime('now'))
     ORDER BY priority DESC, datetime(created_at) DESC`
  );
}

function findById(id) {
  return get(
    `SELECT ${SELECT_FIELDS} FROM announcements WHERE id = ?`,
    [Number(id)]
  );
}

function list({ isActive, limit = 50, offset = 0 } = {}) {
  const safeLimit  = Math.min(Math.max(Number(limit)  || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const conditions = [];
  const params     = [];

  if (isActive !== undefined && isActive !== null) {
    conditions.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  return all(
    `SELECT ${SELECT_FIELDS}
     FROM announcements
     ${where}
     ORDER BY priority DESC, datetime(created_at) DESC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  );
}

function count({ isActive } = {}) {
  const conditions = [];
  const params     = [];
  if (isActive !== undefined && isActive !== null) {
    conditions.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const row = get(`SELECT COUNT(*) AS total FROM announcements ${where}`, params);
  return Number(row?.total || 0);
}

function create(payload) {
  run(
    `INSERT INTO announcements
       (text, emoji, link_url, link_label, priority, is_active, starts_at, ends_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.text,
      payload.emoji     || null,
      payload.linkUrl   || null,
      payload.linkLabel || null,
      payload.priority  !== undefined ? Number(payload.priority) : 0,
      payload.isActive  !== undefined ? (payload.isActive ? 1 : 0) : 1,
      payload.startsAt  || null,
      payload.endsAt    || null,
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

  if (payload.text      !== undefined) { fields.push('text = ?');       params.push(payload.text); }
  if (payload.emoji     !== undefined) { fields.push('emoji = ?');      params.push(payload.emoji || null); }
  if (payload.linkUrl   !== undefined) { fields.push('link_url = ?');   params.push(payload.linkUrl || null); }
  if (payload.linkLabel !== undefined) { fields.push('link_label = ?'); params.push(payload.linkLabel || null); }
  if (payload.priority  !== undefined) { fields.push('priority = ?');   params.push(Number(payload.priority)); }
  if (payload.isActive  !== undefined) { fields.push('is_active = ?');  params.push(payload.isActive ? 1 : 0); }
  if (payload.startsAt  !== undefined) { fields.push('starts_at = ?');  params.push(payload.startsAt || null); }
  if (payload.endsAt    !== undefined) { fields.push('ends_at = ?');    params.push(payload.endsAt || null); }

  if (fields.length === 0) return existing;

  fields.push(`updated_at = datetime('now')`);
  params.push(Number(id));

  run(`UPDATE announcements SET ${fields.join(', ')} WHERE id = ?`, params);
  persist();
  return findById(id);
}

function toggleActive(id) {
  const existing = findById(id);
  if (!existing) return null;
  const newVal = existing.isActive ? 0 : 1;
  run(
    `UPDATE announcements SET is_active = ?, updated_at = datetime('now') WHERE id = ?`,
    [newVal, Number(id)]
  );
  persist();
  return findById(id);
}

function remove(id) {
  const existing = findById(id);
  if (!existing) return false;
  run('DELETE FROM announcements WHERE id = ?', [Number(id)]);
  persist();
  return true;
}

module.exports = {
  findActive,
  findById,
  list,
  count,
  create,
  update,
  toggleActive,
  remove,
};
