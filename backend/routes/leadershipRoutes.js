const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const leadershipController = require('../controllers/leadershipController');

const router = express.Router();

// Public route
router.get('/public', leadershipController.getPublishedLeadership);

// Admin routes
router.get('/', adminAuth, requirePermission('content:read'), leadershipController.listLeadership);
router.get('/:id', adminAuth, requirePermission('content:read'), leadershipController.getLeadership);
router.post('/', adminAuth, requirePermission('content:write'), leadershipController.createLeadership);
router.patch('/:id', adminAuth, requirePermission('content:write'), leadershipController.updateLeadership);
router.patch('/:id/toggle', adminAuth, requirePermission('content:write'), leadershipController.toggleLeadership);
router.delete('/:id', adminAuth, requirePermission('content:write'), leadershipController.deleteLeadership);

module.exports = router;
