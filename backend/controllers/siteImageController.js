const asyncHandler = require('../middleware/asyncHandler');
const SiteImage = require('../models/SiteImage');

/**
 * GET /api/site-images/public
 * Public — list all or by category
 */
const getPublicSiteImages = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const items = SiteImage.listAll(category);
  return res.json({
    success: true,
    data: items,
  });
});

/**
 * GET /api/site-images/public/:slotKey
 * Public — single slot
 */
const getPublicSiteImageSlot = asyncHandler(async (req, res) => {
  const item = SiteImage.findBySlot(req.params.slotKey);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Image slot not found' });
  }
  return res.json({ success: true, data: item });
});

/**
 * GET /api/site-images
 * Admin — list all slots
 */
const listSiteImages = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const items = SiteImage.listAll(category);
  return res.json({
    success: true,
    data: items,
  });
});

/**
 * PATCH /api/site-images/:slotKey
 * Admin — update an image slot URL and metadata
 */
const updateSiteImageSlot = asyncHandler(async (req, res) => {
  const { slotKey } = req.params;
  const { imageUrl, title, subtitle, caption, altText } = req.body;

  const updated = SiteImage.updateSlot(slotKey, {
    imageUrl: imageUrl !== undefined ? imageUrl.trim() : undefined,
    title: title !== undefined ? title.trim() : undefined,
    subtitle: subtitle !== undefined ? subtitle.trim() : undefined,
    caption: caption !== undefined ? caption.trim() : undefined,
    altText: altText !== undefined ? altText.trim() : undefined,
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Image slot not found' });
  }

  return res.json({
    success: true,
    message: 'Site image slot updated successfully',
    data: updated,
  });
});

module.exports = {
  getPublicSiteImages,
  getPublicSiteImageSlot,
  listSiteImages,
  updateSiteImageSlot,
};

