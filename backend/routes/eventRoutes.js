const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Public route
router.get('/public', eventController.getPublishedEvents);

// Admin routes
router.get('/', adminAuth, requirePermission('content:read'), eventController.listEvents);
router.get('/:id', adminAuth, requirePermission('content:read'), eventController.getEvent);
router.post('/', adminAuth, requirePermission('content:write'), eventController.createEvent);
router.patch('/:id', adminAuth, requirePermission('content:write'), eventController.updateEvent);
router.patch('/:id/toggle', adminAuth, requirePermission('content:write'), eventController.toggleEvent);
router.delete('/:id', adminAuth, requirePermission('content:write'), eventController.deleteEvent);

module.exports = router;
