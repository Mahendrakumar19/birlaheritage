const galleryService = require('../services/galleryService');
const asyncHandler   = require('../middleware/asyncHandler');
const { deleteUploadedFile } = require('../middleware/upload');
const {
  validateCreate,
  validateUpdate,
  validateReorder,
} = require('../validations/galleryValidation');

/**
 * GET /api/gallery
 * Public — list gallery items
 * Query: ?collection= &active= &limit= &offset=
 */
const listGallery = asyncHandler(async (req, res) => {
  const { collection, active, limit, offset } = req.query;

  const { items, total } = galleryService.listItems({
    collection: collection || undefined,
    isActive:   active    || undefined,
    limit:      limit     || 50,
    offset:     offset    || 0,
  });

  const safeLimit  = Math.min(Math.max(Number(limit)  || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  return res.json({
    success: true,
    message: 'Gallery items fetched',
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
 * GET /api/gallery/:id
 * Public — single gallery item
 */
const getGalleryItem = asyncHandler(async (req, res) => {
  const item = galleryService.getItemById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }
  return res.json({ success: true, data: item });
});

/**
 * POST /api/gallery
 * Admin — create gallery item (multipart/form-data, field: image)
 */
const createGalleryItem = asyncHandler(async (req, res) => {
  const validation = validateCreate({ body: req.body, file: req.file });

  if (!validation.valid) {
    // Clean up uploaded file if validation fails
    if (req.file) deleteUploadedFile(`/uploads/gallery/${req.file.filename}`);
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  validation.errors,
    });
  }

  const item = galleryService.createItem(validation.data);
  return res.status(201).json({
    success: true,
    message: 'Gallery item created',
    data:    item,
  });
});

/**
 * PATCH /api/gallery/:id
 * Admin — update gallery item metadata (title, description, altText, sortOrder)
 */
const updateGalleryItem = asyncHandler(async (req, res) => {
  const validation = validateUpdate(req.body);

  if (!validation.valid) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  validation.errors,
    });
  }

  const result = galleryService.updateItem(req.params.id, validation.data);

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }

  return res.json({
    success: true,
    message: 'Gallery item updated',
    data:    result.updated,
  });
});

/**
 * PATCH /api/gallery/:id/toggle
 * Admin — toggle active/inactive
 */
const toggleGalleryItem = asyncHandler(async (req, res) => {
  const result = galleryService.toggleItemActive(req.params.id);
  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }
  return res.json({
    success: true,
    message: `Gallery item is now ${result.updated.isActive ? 'active' : 'inactive'}`,
    data:    result.updated,
  });
});

/**
 * PATCH /api/gallery/reorder
 * Admin — bulk reorder items
 * Body: { items: [{ id, sortOrder }] }
 */
const reorderGallery = asyncHandler(async (req, res) => {
  const validation = validateReorder(req.body.items);
  if (!validation.valid) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  validation.errors,
    });
  }
  galleryService.reorderItems(req.body.items);
  return res.json({ success: true, message: 'Gallery reordered successfully' });
});

/**
 * DELETE /api/gallery/:id
 * Admin — delete gallery item and its uploaded image
 */
const deleteGalleryItem = asyncHandler(async (req, res) => {
  const result = galleryService.deleteItem(req.params.id);

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Gallery item not found' });
  }

  // Best-effort file cleanup
  deleteUploadedFile(result.imagePath);

  return res.json({
    success: true,
    message: 'Gallery item deleted successfully',
  });
});

module.exports = {
  listGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  toggleGalleryItem,
  reorderGallery,
  deleteGalleryItem,
};
