const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

// Public route
router.get('/public', testimonialController.getPublishedTestimonials);

// Admin routes
router.get('/', adminAuth, requirePermission('content:read'), testimonialController.listTestimonials);
router.get('/:id', adminAuth, requirePermission('content:read'), testimonialController.getTestimonial);
router.post('/', adminAuth, requirePermission('content:write'), testimonialController.createTestimonial);
router.patch('/:id', adminAuth, requirePermission('content:write'), testimonialController.updateTestimonial);
router.patch('/:id/toggle', adminAuth, requirePermission('content:write'), testimonialController.toggleTestimonial);
router.delete('/:id', adminAuth, requirePermission('content:write'), testimonialController.deleteTestimonial);

module.exports = router;
