const disclosureService = require('../services/disclosureService');
const asyncHandler = require('../middleware/asyncHandler');
const { deleteUploadedPdf } = require('../middleware/uploadPdf');

/**
 * @desc    Get all mandatory disclosures
 * @route   GET /api/disclosures
 * @access  Public
 */
exports.getDisclosures = asyncHandler(async (req, res) => {
  const disclosures = disclosureService.listDisclosures();
  res.status(200).json({
    success: true,
    data: disclosures,
    meta: { total: disclosures.length },
  });
});

/**
 * @desc    Get single disclosure
 * @route   GET /api/disclosures/:id
 * @access  Public
 */
exports.getDisclosure = asyncHandler(async (req, res) => {
  const disclosure = disclosureService.getDisclosureById(req.params.id);

  if (!disclosure) {
    return res.status(404).json({
      success: false,
      message: 'Mandatory disclosure not found',
    });
  }

  res.status(200).json({
    success: true,
    data: disclosure,
  });
});

/**
 * @desc    Create new mandatory disclosure
 * @route   POST /api/disclosures
 * @access  Private/Admin
 */
exports.createDisclosure = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a PDF file',
    });
  }

  const { title, order } = req.body;
  if (!title) {
    // Clean up uploaded file if validation fails
    deleteUploadedPdf(`/uploads/pdfs/${req.file.filename}`);
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'title', message: 'Please provide a title' }],
    });
  }

  const pdfUrl = `/uploads/pdfs/${req.file.filename}`;

  const disclosure = disclosureService.createDisclosure({
    title,
    pdfUrl,
    order: order ? parseInt(order) : 0,
  });

  res.status(201).json({
    success: true,
    data: disclosure,
  });
});

/**
 * @desc    Update mandatory disclosure
 * @route   PATCH /api/disclosures/:id
 * @access  Private/Admin
 */
exports.updateDisclosure = asyncHandler(async (req, res) => {
  let disclosure = disclosureService.getDisclosureById(req.params.id);

  if (!disclosure) {
    if (req.file) {
      deleteUploadedPdf(`/uploads/pdfs/${req.file.filename}`);
    }
    return res.status(404).json({
      success: false,
      message: 'Mandatory disclosure not found',
    });
  }

  const { title, order } = req.body;
  const updateData = {};
  
  if (title !== undefined) updateData.title = title;
  if (order !== undefined) updateData.order = parseInt(order);

  if (req.file) {
    // Delete old PDF
    deleteUploadedPdf(disclosure.pdfUrl);
    updateData.pdfUrl = `/uploads/pdfs/${req.file.filename}`;
  }

  disclosure = disclosureService.updateDisclosure(req.params.id, updateData).updated;

  res.status(200).json({
    success: true,
    data: disclosure,
  });
});

/**
 * @desc    Delete mandatory disclosure
 * @route   DELETE /api/disclosures/:id
 * @access  Private/Admin
 */
exports.deleteDisclosure = asyncHandler(async (req, res) => {
  const result = disclosureService.deleteDisclosure(req.params.id);

  if (result.notFound) {
    return res.status(404).json({
      success: false,
      message: 'Mandatory disclosure not found',
    });
  }

  deleteUploadedPdf(result.previous.pdfUrl);

  res.status(200).json({
    success: true,
    data: {},
  });
});
