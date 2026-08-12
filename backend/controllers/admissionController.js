const admissionService = require('../services/admissionService');
const asyncHandler = require('../middleware/asyncHandler');
const logger = require('../utils/logger');

/** POST /api/admissions — Submit a new admission enquiry */
const createAdmission = asyncHandler(async (req, res) => {
  const record = admissionService.createEnquiry(req.validated, {
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });
  const publicRecord = { ...record };
  delete publicRecord.studentAadhaar;

  return res.status(201).json({
    success: true,
    message: 'Admission enquiry submitted successfully',
    data: publicRecord,
  });
});

/** GET /api/admissions — List all admission enquiries (admin) */
const listAdmissions = asyncHandler(async (req, res) => {
  const { items, total } = admissionService.listEnquiries({
    limit: req.query.limit,
    offset: req.query.offset,
    status: req.query.status,
    grade: req.query.grade,
  });

  const limit = Number(req.query.limit) || 50;
  const offset = Number(req.query.offset) || 0;

  return res.json({
    success: true,
    message: 'Admission enquiries fetched',
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

/** GET /api/admissions/:id — Get a single admission enquiry (admin) */
const getAdmission = asyncHandler(async (req, res) => {
  const record = admissionService.getEnquiryById(req.params.id);
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Admission enquiry not found',
    });
  }

  return res.json({
    success: true,
    data: record,
  });
});

/** GET /api/admissions/:id/sensitive — Explicit audited PII reveal */
const getSensitiveAdmission = asyncHandler(async (req, res) => {
  const record = admissionService.getSensitiveEnquiryById(req.params.id);
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Admission enquiry not found',
    });
  }

  logger.warn('sensitive_admission_accessed', {
    requestId: req.requestId,
    actorId: req.adminUser?.id,
    actorRole: req.adminUser?.role,
    admissionId: Number(req.params.id),
    ip: req.ip,
  });

  return res.json({
    success: true,
    data: {
      id: record.id,
      studentAadhaar: record.studentAadhaar,
    },
  });
});

/** PATCH /api/admissions/:id/status — Update status of an admission enquiry (admin) */
const updateAdmissionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || typeof status !== 'string') {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'status', message: 'status is required' }],
    });
  }

  const result = admissionService.updateEnquiryStatus(req.params.id, status.trim().toLowerCase());

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Admission enquiry not found' });
  }
  if (result.invalid) {
    return res.status(422).json({
      success: false,
      message: result.invalid,
      allowedStatuses: admissionService.VALID_STATUSES,
    });
  }

  return res.json({
    success: true,
    message: 'Status updated successfully',
    data: result.updated,
  });
});

/** DELETE /api/admissions/:id — Delete an admission enquiry permanently (admin) */
const deleteAdmission = asyncHandler(async (req, res) => {
  const result = admissionService.deleteEnquiry(req.params.id);

  if (result.notFound) {
    return res.status(404).json({ success: false, message: 'Admission enquiry not found' });
  }

  return res.json({
    success: true,
    message: 'Admission enquiry deleted successfully',
  });
});

module.exports = {
  createAdmission,
  listAdmissions,
  getAdmission,
  getSensitiveAdmission,
  updateAdmissionStatus,
  deleteAdmission,
};
