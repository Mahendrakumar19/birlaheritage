const express = require('express');
const router = express.Router();
const {
  getDisclosures,
  getDisclosure,
  createDisclosure,
  updateDisclosure,
  deleteDisclosure,
} = require('../controllers/disclosureController');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const { uploadPdf, deleteUploadedPdf } = require('../middleware/uploadPdf');

const uploadSinglePdf = (req, res, next) => {
  uploadPdf.single('pdf')(req, res, (err) => {
    if (err) {
      return res.status(err.statusCode || 422).json({
        success: false,
        message: err.code === 'LIMIT_FILE_SIZE'
          ? 'PDF file must be 10 MB or smaller'
          : err.message || 'PDF upload failed',
      });
    }
    return next();
  });
};

// Public routes
router.route('/').get(getDisclosures);
router.route('/:id').get(getDisclosure);

// Protected routes (Admin only)
router.use(adminAuth);
router.use(requirePermission('content:write'));
router.route('/').post(uploadSinglePdf, createDisclosure);
router.route('/:id')
  .patch(uploadSinglePdf, updateDisclosure)
  .delete(deleteDisclosure);

module.exports = router;
