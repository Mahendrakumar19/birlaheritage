const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;

/**
 * Validate announcement creation payload
 */
function validateCreate(body) {
  const errors = [];

  // text — required
  if (!body.text || typeof body.text !== 'string' || body.text.trim().length < 3) {
    errors.push({ field: 'text', message: 'text is required and must be at least 3 characters' });
  }
  if (body.text && body.text.trim().length > 500) {
    errors.push({ field: 'text', message: 'text must be 500 characters or fewer' });
  }

  // emoji — optional, single grapheme
  if (body.emoji !== undefined && body.emoji !== null && body.emoji !== '') {
    if (typeof body.emoji !== 'string' || [...body.emoji].length > 4) {
      errors.push({ field: 'emoji', message: 'emoji must be a short string (1-4 characters/glyphs)' });
    }
  }

  // linkUrl — optional, must look like a URL if provided
  if (body.linkUrl && typeof body.linkUrl === 'string') {
    try { new URL(body.linkUrl); } catch {
      // also allow relative paths starting with /
      if (!body.linkUrl.startsWith('/')) {
        errors.push({ field: 'linkUrl', message: 'linkUrl must be a valid URL or relative path' });
      }
    }
  }

  // linkLabel — optional
  if (body.linkLabel && body.linkLabel.length > 100) {
    errors.push({ field: 'linkLabel', message: 'linkLabel must be 100 characters or fewer' });
  }

  // priority — optional integer
  if (body.priority !== undefined) {
    const n = Number(body.priority);
    if (Number.isNaN(n)) {
      errors.push({ field: 'priority', message: 'priority must be a number' });
    }
  }

  // starts_at / ends_at — optional ISO date strings
  if (body.startsAt && !ISO_DATE_RE.test(body.startsAt)) {
    errors.push({ field: 'startsAt', message: 'startsAt must be ISO date format (YYYY-MM-DD or YYYY-MM-DDTHH:MM)' });
  }
  if (body.endsAt && !ISO_DATE_RE.test(body.endsAt)) {
    errors.push({ field: 'endsAt', message: 'endsAt must be ISO date format (YYYY-MM-DD or YYYY-MM-DDTHH:MM)' });
  }
  if (body.startsAt && body.endsAt && body.startsAt > body.endsAt) {
    errors.push({ field: 'endsAt', message: 'endsAt must be after startsAt' });
  }

  if (errors.length) return { valid: false, errors };

  return {
    valid: true,
    data: {
      text:       body.text.trim(),
      emoji:      body.emoji      ? body.emoji.trim()      : undefined,
      linkUrl:    body.linkUrl    ? body.linkUrl.trim()    : undefined,
      linkLabel:  body.linkLabel  ? body.linkLabel.trim()  : undefined,
      priority:   body.priority   !== undefined ? Number(body.priority) : 0,
      isActive:   body.isActive   !== undefined ? body.isActive !== false && body.isActive !== 'false' && body.isActive !== '0' : true,
      startsAt:   body.startsAt   || undefined,
      endsAt:     body.endsAt     || undefined,
    },
  };
}

/**
 * Validate announcement update payload (all fields optional)
 */
function validateUpdate(body) {
  const errors = [];
  const data   = {};

  if (body.text !== undefined) {
    if (typeof body.text !== 'string' || body.text.trim().length < 3) {
      errors.push({ field: 'text', message: 'text must be at least 3 characters' });
    } else if (body.text.trim().length > 500) {
      errors.push({ field: 'text', message: 'text must be 500 characters or fewer' });
    } else {
      data.text = body.text.trim();
    }
  }

  if (body.emoji !== undefined)     data.emoji     = body.emoji     || null;
  if (body.linkUrl !== undefined)   data.linkUrl   = body.linkUrl   || null;
  if (body.linkLabel !== undefined) data.linkLabel = body.linkLabel || null;

  if (body.priority !== undefined) {
    const n = Number(body.priority);
    if (Number.isNaN(n)) {
      errors.push({ field: 'priority', message: 'priority must be a number' });
    } else {
      data.priority = n;
    }
  }

  if (body.isActive !== undefined) {
    data.isActive = body.isActive !== false && body.isActive !== 'false' && body.isActive !== '0';
  }

  if (body.startsAt !== undefined) {
    if (body.startsAt && !ISO_DATE_RE.test(body.startsAt)) {
      errors.push({ field: 'startsAt', message: 'startsAt must be ISO date format' });
    } else {
      data.startsAt = body.startsAt || null;
    }
  }

  if (body.endsAt !== undefined) {
    if (body.endsAt && !ISO_DATE_RE.test(body.endsAt)) {
      errors.push({ field: 'endsAt', message: 'endsAt must be ISO date format' });
    } else {
      data.endsAt = body.endsAt || null;
    }
  }

  const resolvedStarts = data.startsAt ?? body.startsAt;
  const resolvedEnds   = data.endsAt   ?? body.endsAt;
  if (resolvedStarts && resolvedEnds && resolvedStarts > resolvedEnds) {
    errors.push({ field: 'endsAt', message: 'endsAt must be after startsAt' });
  }

  if (errors.length) return { valid: false, errors };
  return { valid: true, data };
}

module.exports = { validateCreate, validateUpdate };
