const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const { requirePermission } = require('../middleware/requireRole');
const controller = require('../controllers/adminUserController');

const router = express.Router();
router.use(adminAuth, requirePermission('users:manage'));

router.get('/', controller.listUsers);
router.post('/', controller.createUser);
router.patch('/:id', controller.updateUser);

module.exports = router;
