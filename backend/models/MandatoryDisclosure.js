const { run, get, all, lastInsertId, persist } = require('../config/db');

const SELECT_FIELDS = `
  id,
  id          AS _id,
  title,
  pdf_url     AS pdfUrl,
  sort_order  AS 'order',
  created_at  AS createdAt,
  updated_at  AS updatedAt
`;

function find() {
  return all(
    `SELECT ${SELECT_FIELDS}
     FROM mandatory_disclosures
     ORDER BY sort_order ASC, datetime(created_at) ASC`
  );
}

function findById(id) {
  return get(
    `SELECT ${SELECT_FIELDS} FROM mandatory_disclosures WHERE id = ?`,
    [Number(id)]
  );
}

function create(data) {
  run(
    `INSERT INTO mandatory_disclosures (title, pdf_url, sort_order)
     VALUES (?, ?, ?)`,
    [data.title, data.pdfUrl, data.order || 0]
  );
  const id = lastInsertId();
  persist();
  return findById(id);
}

function update(id, data) {
  const updates = [];
  const values = [];

  if (data.title !== undefined) {
    updates.push('title = ?');
    values.push(data.title);
  }
  if (data.pdfUrl !== undefined) {
    updates.push('pdf_url = ?');
    values.push(data.pdfUrl);
  }
  if (data.order !== undefined) {
    updates.push('sort_order = ?');
    values.push(data.order);
  }

  if (updates.length > 0) {
    updates.push("updated_at = datetime('now')");
    values.push(Number(id));

    run(
      `UPDATE mandatory_disclosures
       SET ${updates.join(', ')}
       WHERE id = ?`,
      values
    );
  }

  const result = findById(id);
  persist();
  return result;
}

function remove(id) {
  run(`DELETE FROM mandatory_disclosures WHERE id = ?`, [Number(id)]);
  persist();
  return true;
}

module.exports = {
  find,
  findById,
  create,
  update,
  remove
};
