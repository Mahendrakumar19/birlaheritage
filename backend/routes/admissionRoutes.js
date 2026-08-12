const express = require('express');
const admissionController = require('../controllers/admissionController');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const { publicFormRateLimit } = require('../middleware/sensitiveRateLimits');
const { rejectHoneypot } = require('../middleware/botProtection');
const { admissionSchema } = require('../validations/admissionValidation');

const router = express.Router();

// Public: Submit an admission enquiry
router.post('/', publicFormRateLimit, rejectHoneypot, validate(admissionSchema), admissionController.createAdmission);

// Admin-only: Read operations (supports ?status= and ?grade= filters)
router.get('/', adminAuth, requirePermission('admissions:read'), admissionController.listAdmissions);
router.get('/:id/sensitive', adminAuth, requirePermission('pii:reveal'), admissionController.getSensitiveAdmission);
router.get('/:id', adminAuth, requirePermission('admissions:read'), admissionController.getAdmission);

// Admin-only: Update & Delete (full CRUD)
router.patch('/:id/status', adminAuth, requirePermission('admissions:write'), admissionController.updateAdmissionStatus);
router.delete('/:id', adminAuth, requirePermission('admissions:write'), admissionController.deleteAdmission);

module.exports = router;
