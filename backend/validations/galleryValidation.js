const VALID_COLLECTIONS = ['campus', 'students-corner'];

/**
 * Validate gallery item creation payload (from req.body + req.file)
 * Returns { valid: true, data } or { valid: false, errors: [] }
 */
function validateCreate({ body, file }) {
  const errors = [];

  // collection
  if (!body.collection || !VALID_COLLECTIONS.includes(body.collection)) {
    errors.push({ field: 'collection', message: `collection must be one of: ${VALID_COLLECTIONS.join(', ')}` });
  }

  // title
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 2) {
    errors.push({ field: 'title', message: 'title is required and must be at least 2 characters' });
  }
  if (body.title && body.title.trim().length > 200) {
    errors.push({ field: 'title', message: 'title must be 200 characters or fewer' });
  }

  // description (optional)
  if (body.description && body.description.length > 1000) {
    errors.push({ field: 'description', message: 'description must be 1000 characters or fewer' });
  }

  // alt_text (optional)
  if (body.altText && body.altText.length > 300) {
    errors.push({ field: 'altText', message: 'altText must be 300 characters or fewer' });
  }

  // image file required for create
  if (!file) {
    errors.push({ field: 'image', message: 'image file is required' });
  }

  if (errors.length) return { valid: false, errors };

  return {
    valid: true,
    data: {
      collection:  body.collection.trim(),
      title:       body.title.trim(),
      description: body.description ? body.description.trim() : undefined,
      altText:     body.altText    ? body.altText.trim()    : undefined,
      sortOrder:   body.sortOrder  !== undefined ? Number(body.sortOrder) : undefined,
      isActive:    body.isActive   !== undefined ? body.isActive !== 'false' && body.isActive !== '0' : true,
      imagePath:   `/uploads/gallery/${file.filename}`,
    },
  };
}

/**
 * Validate gallery item update payload (all fields optional)
 * Returns { valid: true, data } or { valid: false, errors: [] }
 */
function validateUpdate(body) {
  const errors = [];
  const data   = {};

  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim().length < 2) {
      errors.push({ field: 'title', message: 'title must be at least 2 characters' });
    } else if (body.title.trim().length > 200) {
      errors.push({ field: 'title', message: 'title must be 200 characters or fewer' });
    } else {
      data.title = body.title.trim();
    }
  }

  if (body.description !== undefined) {
    if (body.description.length > 1000) {
      errors.push({ field: 'description', message: 'description must be 1000 characters or fewer' });
    } else {
      data.description = body.description.trim() || null;
    }
  }

  if (body.altText !== undefined) {
    if (body.altText.length > 300) {
      errors.push({ field: 'altText', message: 'altText must be 300 characters or fewer' });
    } else {
      data.altText = body.altText.trim() || null;
    }
  }

  if (body.sortOrder !== undefined) {
    const n = Number(body.sortOrder);
    if (Number.isNaN(n) || n < 0) {
      errors.push({ field: 'sortOrder', message: 'sortOrder must be a non-negative integer' });
    } else {
      data.sortOrder = n;
    }
  }

  if (errors.length) return { valid: false, errors };
  return { valid: true, data };
}

/**
 * Validate bulk reorder payload
 */
function validateReorder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, errors: [{ field: 'items', message: 'items must be a non-empty array' }] };
  }
  const errors = [];
  items.forEach((item, idx) => {
    if (!item.id || typeof item.sortOrder !== 'number') {
      errors.push({ field: `items[${idx}]`, message: 'each item must have id and sortOrder (number)' });
    }
  });
  if (errors.length) return { valid: false, errors };
  return { valid: true };
}

module.exports = { validateCreate, validateUpdate, validateReorder, VALID_COLLECTIONS };
