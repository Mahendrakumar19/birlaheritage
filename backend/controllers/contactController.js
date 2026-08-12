const contactService = require('../services/contactService');
const asyncHandler = require('../middleware/asyncHandler');

/** POST /api/contact — Create a new contact message */
const createContact = asyncHandler(async (req, res) => {
  const record = contactService.createMessage(req.validated, {
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  return res.status(201).json({
    success: true,
    message: 'Contact message submitted successfully',
    data: record,
  });
});

/** GET /api/contact — List all contact messages (admin) */
const listContacts = asyncHandler(async (req, res) => {
  const { items, total } = contactService.listMessages({
    limit: req.query.limit,
    offset: req.query.offset,
    status: req.query.status,
  });

  const limit = Number(req.query.limit) || 50;
  const offset = Number(req.query.offset) || 0;

  return res.json({
    success: true,
    message: 'Contact messages fetched',
    data: items,
    meta: {
      total,
      limit,
      offset,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/** GET /api/contact/:id — Get a single contact message (admin) */
const getContact = asyncHandler(async (req, res) => {
  const record = contactService.getMessageById(req.params.id);
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found',
    });
  }

  return res.json({
    success: true,
    data: record,
  });
});

/** PATCH /api/contact/:id/status — Update status of a contact message (admin) */
const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || typeof status !== 'string') {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'status', message: 'status is required' }],
    });
  }

  const result = contactService.updateMessageStatus(req.params.id, status.trim().toLowerCase());

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Contact message not found' });
  }
  if (result.invalid) {
    return res.status(422).json({
      success: false,
      message: result.invalid,
      allowedStatuses: contactService.VALID_STATUSES,
    });
  }

  return res.json({
    success: true,
    message: 'Status updated successfully',
    data: result.updated,
  });
});

/** DELETE /api/contact/:id — Delete a contact message permanently (admin) */
const deleteContact = asyncHandler(async (req, res) => {
  const result = contactService.deleteMessage(req.params.id);

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Contact message not found' });
  }

  return res.json({
    success: true,
    message: 'Contact message deleted successfully',
  });
});

module.exports = {
  createContact,
  listContacts,
  getContact,
  updateContactStatus,
  deleteContact,
};
