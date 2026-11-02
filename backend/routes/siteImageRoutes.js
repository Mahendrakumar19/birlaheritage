const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const siteImageController = require('../controllers/siteImageController');

const router = express.Router();

// ── Public Routes ─────────────────────────────────────────────────────────────
router.get('/public', siteImageController.getPublicSiteImages);
router.get('/public/:slotKey', siteImageController.getPublicSiteImageSlot);

// ── Admin Routes ──────────────────────────────────────────────────────────────
router.get('/', adminAuth, requirePermission('content:read'), siteImageController.listSiteImages);
router.patch('/:slotKey', adminAuth, requirePermission('content:write'), siteImageController.updateSiteImageSlot);

module.exports = router;

