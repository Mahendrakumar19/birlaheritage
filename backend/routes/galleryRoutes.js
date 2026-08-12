const express    = require('express');
const adminAuth  = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const asyncHandler = require('../middleware/asyncHandler');
const { upload, deleteUploadedFile } = require('../middleware/upload');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
// GET  /api/gallery             - list items (?collection= &active= &limit= &offset=)
// GET  /api/gallery/:id         - get single item
router.get('/', galleryController.listGallery);
router.get('/:id', galleryController.getGalleryItem);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// POST   /api/gallery           - create (multipart, field: image)
// PATCH  /api/gallery/reorder   - bulk reorder (must come before /:id)
// PATCH  /api/gallery/:id       - update metadata
// PATCH  /api/gallery/:id/toggle - toggle active status
// DELETE /api/gallery/:id       - delete item + file

// Multer error handler wrapper
const uploadSingle = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(422).json({
          success: false,
          message: 'Validation failed',
          errors: [{ field: 'image', message: 'Image file must be 10 MB or smaller' }],
        });
      }
      return res.status(err.statusCode || 422).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }
    next();
  });
};

router.post('/',              adminAuth, requirePermission('content:write'), uploadSingle, galleryController.createGalleryItem);
router.patch('/reorder',      adminAuth, requirePermission('content:write'), galleryController.reorderGallery);
router.patch('/:id',          adminAuth, requirePermission('content:write'), galleryController.updateGalleryItem);
router.patch('/:id/toggle',   adminAuth, requirePermission('content:write'), galleryController.toggleGalleryItem);
router.delete('/:id',         adminAuth, requirePermission('content:write'), galleryController.deleteGalleryItem);

module.exports = router;
