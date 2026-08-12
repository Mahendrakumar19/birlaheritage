const announcementService = require('../services/announcementService');
const asyncHandler        = require('../middleware/asyncHandler');
const { validateCreate, validateUpdate } = require('../validations/announcementValidation');

/**
 * GET /api/announcements/active
 * Public — returns only currently live announcements for the banner
 */
const getActive = asyncHandler(async (req, res) => {
  const items = announcementService.getActiveAnnouncements();
  return res.json({
    success: true,
    message: 'Active announcements fetched',
    data:    items,
    count:   items.length,
  });
});

/**
 * GET /api/announcements
 * Admin — list all announcements (supports ?active= &limit= &offset=)
 */
const listAnnouncements = asyncHandler(async (req, res) => {
  const { active, limit, offset } = req.query;

  const { items, total } = announcementService.listAnnouncements({
    isActive: active,
    limit:    limit  || 50,
    offset:   offset || 0,
  });

  const safeLimit  = Math.min(Math.max(Number(limit)  || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  return res.json({
    success: true,
    message: 'Announcements fetched',
    data:    items,
    meta: {
      total,
      limit:      safeLimit,
      offset:     safeOffset,
      page:       Math.floor(safeOffset / safeLimit) + 1,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

/**
 * GET /api/announcements/:id
 * Admin — get single announcement
 */
const getAnnouncement = asyncHandler(async (req, res) => {
  const item = announcementService.getAnnouncementById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }
  return res.json({ success: true, data: item });
});

/**
 * POST /api/announcements
 * Admin — create announcement
 */
const createAnnouncement = asyncHandler(async (req, res) => {
  const validation = validateCreate(req.body);
  if (!validation.valid) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  validation.errors,
    });
  }

  const item = announcementService.createAnnouncement(validation.data);
  return res.status(201).json({
    success: true,
    message: 'Announcement created',
    data:    item,
  });
});

/**
 * PATCH /api/announcements/:id
 * Admin — update announcement
 */
const updateAnnouncement = asyncHandler(async (req, res) => {
  const validation = validateUpdate(req.body);
  if (!validation.valid) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  validation.errors,
    });
  }

  const result = announcementService.updateAnnouncement(req.params.id, validation.data);
  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }
  return res.json({
    success: true,
    message: 'Announcement updated',
    data:    result.updated,
  });
});

/**
 * PATCH /api/announcements/:id/toggle
 * Admin — toggle active/inactive
 */
const toggleAnnouncement = asyncHandler(async (req, res) => {
  const result = announcementService.toggleAnnouncementActive(req.params.id);
  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }
  return res.json({
    success: true,
    message: `Announcement is now ${result.updated.isActive ? 'active' : 'inactive'}`,
    data:    result.updated,
  });
});

/**
 * DELETE /api/announcements/:id
 * Admin — hard delete
 */
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const result = announcementService.deleteAnnouncement(req.params.id);
  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }
  return res.json({ success: true, message: 'Announcement deleted successfully' });
});

module.exports = {
  getActive,
  listAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  toggleAnnouncement,
  deleteAnnouncement,
};
