const Achievement = require('../models/Achievement');

async function getPublishedAchievements(req, res, next) {
  try {
    const items = Achievement.listPublished();
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function listAchievements(req, res, next) {
  try {
    const isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : undefined;
    const items = Achievement.list({ isPublished, limit: req.query.limit, offset: req.query.offset });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function getAchievement(req, res, next) {
  try {
    const item = Achievement.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

async function createAchievement(req, res, next) {
  try {
    if (!req.body.studentName || !req.body.title) {
      return res.status(400).json({ success: false, message: 'Student name and title are required' });
    }
    const created = Achievement.create(req.body);
    res.status(201).json({ success: true, message: 'Achievement created', data: created });
  } catch (err) {
    next(err);
  }
}

async function updateAchievement(req, res, next) {
  try {
    const updated = Achievement.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, message: 'Achievement updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function toggleAchievement(req, res, next) {
  try {
    const updated = Achievement.togglePublished(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, message: 'Achievement status updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteAchievement(req, res, next) {
  try {
    const deleted = Achievement.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublishedAchievements,
  listAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  toggleAchievement,
  deleteAchievement,
};
