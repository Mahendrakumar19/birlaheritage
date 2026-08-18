const Event = require('../models/Event');

async function getPublishedEvents(req, res, next) {
  try {
    const items = Event.listPublished();
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function listEvents(req, res, next) {
  try {
    const isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : undefined;
    const items = Event.list({ isPublished, limit: req.query.limit, offset: req.query.offset });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function getEvent(req, res, next) {
  try {
    const item = Event.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    if (!req.body.title || !req.body.shortDescription) {
      return res.status(400).json({ success: false, message: 'Title and short description are required' });
    }
    const created = Event.create(req.body);
    res.status(201).json({ success: true, message: 'Event created successfully', data: created });
  } catch (err) {
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const updated = Event.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event updated successfully', data: updated });
  } catch (err) {
    next(err);
  }
}

async function toggleEvent(req, res, next) {
  try {
    const updated = Event.togglePublished(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event status updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const deleted = Event.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublishedEvents,
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  toggleEvent,
  deleteEvent,
};
