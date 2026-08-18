const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const achievementController = require('../controllers/achievementController');

const router = express.Router();

// Public route
router.get('/public', achievementController.getPublishedAchievements);

// Admin routes
router.get('/', adminAuth, requirePermission('content:read'), achievementController.listAchievements);
router.get('/:id', adminAuth, requirePermission('content:read'), achievementController.getAchievement);
router.post('/', adminAuth, requirePermission('content:write'), achievementController.createAchievement);
router.patch('/:id', adminAuth, requirePermission('content:write'), achievementController.updateAchievement);
router.patch('/:id/toggle', adminAuth, requirePermission('content:write'), achievementController.toggleAchievement);
router.delete('/:id', adminAuth, requirePermission('content:write'), achievementController.deleteAchievement);

module.exports = router;
