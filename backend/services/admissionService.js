const AdmissionEnquiry = require('../models/AdmissionEnquiry');

function createEnquiry(data, meta) {
  return AdmissionEnquiry.create(data, meta);
}

function getEnquiryById(id) {
  return AdmissionEnquiry.findById(id);
}

function getSensitiveEnquiryById(id) {
  return AdmissionEnquiry.findSensitiveById(id);
}

function listEnquiries({ limit, offset, status, grade } = {}) {
  const items = AdmissionEnquiry.list({ limit, offset, status, grade });
  const total = AdmissionEnquiry.count({ status, grade });
  return { items, total };
}

/**
 * Update the status of an admission enquiry
 * @param {number} id
 * @param {string} status
 * @returns {{ updated: object } | { notFound: true } | { invalid: string }}
 */
function updateEnquiryStatus(id, status) {
  const existing = AdmissionEnquiry.findById(id);
  if (!existing) return { notFound: true };

  try {
    const updated = AdmissionEnquiry.updateStatus(id, status);
    return { updated };
  } catch (err) {
    return { invalid: err.message };
  }
}

/**
 * Delete an admission enquiry permanently
 * @param {number} id
 * @returns {{ deleted: true } | { notFound: true }}
 */
function deleteEnquiry(id) {
  const deleted = AdmissionEnquiry.remove(id);
  if (!deleted) return { notFound: true };
  return { deleted: true };
}

module.exports = {
  createEnquiry,
  getEnquiryById,
  getSensitiveEnquiryById,
  listEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  VALID_STATUSES: AdmissionEnquiry.VALID_STATUSES,
};
