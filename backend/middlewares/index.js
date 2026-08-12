/** Compatibility barrel — prefer importing from ../middleware */
module.exports = {
  ...require('../middleware/errorHandler'),
  validate: require('../middleware/validate'),
  adminAuth: require('../middleware/adminAuth'),
  asyncHandler: require('../middleware/asyncHandler'),
};
