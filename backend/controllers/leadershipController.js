const LeadershipProfile = require('../models/LeadershipProfile');

async function getPublishedLeadership(req, res, next) {
  try {
    const items = LeadershipProfile.listPublished();
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function listLeadership(req, res, next) {
  try {
    const isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : undefined;
    const items = LeadershipProfile.list({ isPublished, limit: req.query.limit, offset: req.query.offset });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function getLeadership(req, res, next) {
  try {
    const item = LeadershipProfile.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Leadership profile not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

async function createLeadership(req, res, next) {
  try {
    if (!req.body.name || !req.body.designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required' });
    }
    const created = LeadershipProfile.create(req.body);
    res.status(201).json({ success: true, message: 'Leadership profile created', data: created });
  } catch (err) {
    next(err);
  }
}

async function updateLeadership(req, res, next) {
  try {
    const updated = LeadershipProfile.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Leadership profile not found' });
    }
    res.json({ success: true, message: 'Leadership profile updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function toggleLeadership(req, res, next) {
  try {
    const updated = LeadershipProfile.togglePublished(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Leadership profile not found' });
    }
    res.json({ success: true, message: 'Leadership profile status updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteLeadership(req, res, next) {
  try {
    const deleted = LeadershipProfile.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Leadership profile not found' });
    }
    res.json({ success: true, message: 'Leadership profile deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublishedLeadership,
  listLeadership,
  getLeadership,
  createLeadership,
  updateLeadership,
  toggleLeadership,
  deleteLeadership,
};
