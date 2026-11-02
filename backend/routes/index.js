const express = require('express');
const healthRoutes = require('./healthRoutes');
const admissionRoutes = require('./admissionRoutes');
const contactRoutes = require('./contactRoutes');
const galleryRoutes = require('./galleryRoutes');
const announcementRoutes = require('./announcementRoutes');
const authRoutes = require('./authRoutes');
const disclosureRoutes = require('./disclosureRoutes');
const adminUserRoutes = require('./adminUserRoutes');
const eventRoutes = require('./eventRoutes');
const leadershipRoutes = require('./leadershipRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const achievementRoutes = require('./achievementRoutes');
const siteImageRoutes = require('./siteImageRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/admissions', admissionRoutes);
router.use('/contact', contactRoutes);
router.use('/gallery', galleryRoutes);
router.use('/announcements', announcementRoutes);
router.use('/disclosures', disclosureRoutes);
router.use('/admin-users', adminUserRoutes);
router.use('/events', eventRoutes);
router.use('/leadership', leadershipRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/achievements', achievementRoutes);
router.use('/site-images', siteImageRoutes);

module.exports = router;
