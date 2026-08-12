const express = require('express');
const contactController = require('../controllers/contactController');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const { publicFormRateLimit } = require('../middleware/sensitiveRateLimits');
const { rejectHoneypot } = require('../middleware/botProtection');
const { contactSchema } = require('../validations/contactValidation');

const router = express.Router();

// Public: Submit a contact message
router.post('/', publicFormRateLimit, rejectHoneypot, validate(contactSchema), contactController.createContact);

// Admin-only: Read operations
router.get('/', adminAuth, requirePermission('contacts:read'), contactController.listContacts);
router.get('/:id', adminAuth, requirePermission('contacts:read'), contactController.getContact);

// Admin-only: Update & Delete (full CRUD)
router.patch('/:id/status', adminAuth, requirePermission('contacts:write'), contactController.updateContactStatus);
router.delete('/:id', adminAuth, requirePermission('contacts:write'), contactController.deleteContact);

module.exports = router;
