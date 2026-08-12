const Announcement = require('../models/Announcement');

/**
 * Get all currently live announcements for the banner
 * (respects is_active + starts_at / ends_at scheduling)
 */
function getActiveAnnouncements() {
  return Announcement.findActive();
}

function getAnnouncementById(id) {
  return Announcement.findById(id);
}

function listAnnouncements({ isActive, limit, offset } = {}) {
  let activeFilter = undefined;
  if (isActive !== undefined && isActive !== null && isActive !== '') {
    activeFilter = isActive === 'true' || isActive === '1' || isActive === true;
  }
  const items = Announcement.list({ isActive: activeFilter, limit, offset });
  const total = Announcement.count({ isActive: activeFilter });
  return { items, total };
}

function createAnnouncement(data) {
  return Announcement.create(data);
}

function updateAnnouncement(id, data) {
  const existing = Announcement.findById(id);
  if (!existing) return { notFound: true };
  const updated = Announcement.update(id, data);
  return { updated };
}

function toggleAnnouncementActive(id) {
  const result = Announcement.toggleActive(id);
  if (!result) return { notFound: true };
  return { updated: result };
}

function deleteAnnouncement(id) {
  const deleted = Announcement.remove(id);
  if (!deleted) return { notFound: true };
  return { deleted: true };
}

module.exports = {
  getActiveAnnouncements,
  getAnnouncementById,
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  toggleAnnouncementActive,
  deleteAnnouncement,
};
