const Testimonial = require('../models/Testimonial');

async function getPublishedTestimonials(req, res, next) {
  try {
    const items = Testimonial.listPublished();
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function listTestimonials(req, res, next) {
  try {
    const isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : undefined;
    const items = Testimonial.list({ isPublished, limit: req.query.limit, offset: req.query.offset });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
}

async function getTestimonial(req, res, next) {
  try {
    const item = Testimonial.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

async function createTestimonial(req, res, next) {
  try {
    if (!req.body.name || !req.body.quote) {
      return res.status(400).json({ success: false, message: 'Name and quote are required' });
    }
    const created = Testimonial.create(req.body);
    res.status(201).json({ success: true, message: 'Testimonial created', data: created });
  } catch (err) {
    next(err);
  }
}

async function updateTestimonial(req, res, next) {
  try {
    const updated = Testimonial.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function toggleTestimonial(req, res, next) {
  try {
    const updated = Testimonial.togglePublished(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial status updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteTestimonial(req, res, next) {
  try {
    const deleted = Testimonial.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPublishedTestimonials,
  listTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  toggleTestimonial,
  deleteTestimonial,
};
