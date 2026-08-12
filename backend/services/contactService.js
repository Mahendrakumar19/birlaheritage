const ContactMessage = require('../models/ContactMessage');

function createMessage(data, meta) {
  return ContactMessage.create(data, meta);
}

function getMessageById(id) {
  return ContactMessage.findById(id);
}

function listMessages({ limit, offset, status } = {}) {
  const items = ContactMessage.list({ limit, offset, status });
  const total = ContactMessage.count({ status });
  return { items, total };
}

/**
 * Update the status of a contact message
 * @param {number} id
 * @param {string} status
 * @returns {{ updated: object } | { notFound: true } | { invalid: string }}
 */
function updateMessageStatus(id, status) {
  const existing = ContactMessage.findById(id);
  if (!existing) return { notFound: true };

  try {
    const updated = ContactMessage.updateStatus(id, status);
    return { updated };
  } catch (err) {
    return { invalid: err.message };
  }
}

/**
 * Delete a contact message permanently
 * @param {number} id
 * @returns {{ deleted: true } | { notFound: true }}
 */
function deleteMessage(id) {
  const deleted = ContactMessage.remove(id);
  if (!deleted) return { notFound: true };
  return { deleted: true };
}

module.exports = {
  createMessage,
  getMessageById,
  listMessages,
  updateMessageStatus,
  deleteMessage,
  VALID_STATUSES: ContactMessage.VALID_STATUSES,
};
