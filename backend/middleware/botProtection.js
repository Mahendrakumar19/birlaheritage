function rejectHoneypot(req, res, next) {
  const honeypot = req.body?.website || req.body?.companyWebsite;
  if (typeof honeypot === 'string' && honeypot.trim()) {
    // Return a generic success response so automated submitters do not adapt.
    return res.status(202).json({
      success: true,
      message: 'Submission received',
    });
  }
  return next();
}

module.exports = { rejectHoneypot };
