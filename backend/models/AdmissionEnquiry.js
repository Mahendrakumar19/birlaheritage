const { run, get, all, lastInsertId, persist } = require('../config/db');
const { encrypt, decrypt, maskDigits } = require('../utils/fieldEncryption');

const SELECT_FIELDS = `
  id,
  student_first_name AS studentFirstName,
  student_last_name AS studentLastName,
  student_dob AS studentDob,
  student_aadhaar AS studentAadhaar,
  grade,
  parent_guardian_name AS parentGuardianName,
  phone,
  email,
  street_address AS streetAddress,
  street_address_line2 AS streetAddressLine2,
  city,
  state,
  pin_code AS pinCode,
  country,
  status,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

const VALID_STATUSES = ['new', 'under_review', 'accepted', 'rejected', 'archived'];

function maskRecord(record) {
  if (!record) return record;
  return {
    ...record,
    studentAadhaar: maskDigits(record.studentAadhaar),
  };
}

function create(payload, meta = {}) {
  run(
    `INSERT INTO admission_enquiries (
      student_first_name,
      student_last_name,
      student_dob,
      student_aadhaar,
      grade,
      parent_guardian_name,
      phone,
      email,
      street_address,
      street_address_line2,
      city,
      state,
      pin_code,
      country,
      ip_address,
      user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.studentFirstName,
      payload.studentLastName || null,
      payload.studentDob,
      encrypt(payload.studentAadhaar),
      payload.grade,
      payload.parentGuardianName,
      payload.phone,
      payload.email,
      payload.streetAddress,
      payload.streetAddressLine2 || '',
      payload.city,
      payload.state,
      payload.pinCode,
      payload.country,
      meta.ipAddress || null,
      meta.userAgent || null,
    ]
  );

  const id = lastInsertId();
  persist();
  return findById(id);
}

function findById(id) {
  return maskRecord(get(
    `SELECT ${SELECT_FIELDS} FROM admission_enquiries WHERE id = ?`,
    [Number(id)]
  ));
}

function findSensitiveById(id) {
  const record = get(
    `SELECT ${SELECT_FIELDS} FROM admission_enquiries WHERE id = ?`,
    [Number(id)]
  );
  if (!record) return record;
  return {
    ...record,
    studentAadhaar: decrypt(record.studentAadhaar),
  };
}

function list({ limit = 50, offset = 0, status, grade } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (grade) {
    conditions.push('grade = ?');
    params.push(grade);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  return all(
    `SELECT ${SELECT_FIELDS}
     FROM admission_enquiries
     ${where}
     ORDER BY datetime(created_at) DESC
     LIMIT ? OFFSET ?`,
    [...params, safeLimit, safeOffset]
  ).map(maskRecord);
}

function count({ status, grade } = {}) {
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (grade) {
    conditions.push('grade = ?');
    params.push(grade);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const row = get(`SELECT COUNT(*) AS total FROM admission_enquiries ${where}`, params);
  return Number(row?.total || 0);
}

/**
 * Update the status of an admission enquiry (CRUD: Update)
 * @param {number} id
 * @param {string} status - one of: new | under_review | accepted | rejected | archived
 * @returns {object|undefined} updated record or undefined if not found
 */
function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  run(
    `UPDATE admission_enquiries
     SET status = ?, updated_at = datetime('now')
     WHERE id = ?`,
    [status, Number(id)]
  );
  persist();
  return findById(id);
}

/**
 * Hard-delete an admission enquiry (CRUD: Delete)
 * @param {number} id
 * @returns {boolean} true if a row was deleted
 */
function remove(id) {
  const existing = findById(id);
  if (!existing) return false;

  run(
    'DELETE FROM admission_enquiries WHERE id = ?',
    [Number(id)]
  );
  persist();
  return true;
}

module.exports = {
  create,
  findById,
  findSensitiveById,
  list,
  count,
  updateStatus,
  remove,
  VALID_STATUSES,
};
