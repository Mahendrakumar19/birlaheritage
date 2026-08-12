function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      }));

      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    req.validated = parsed.data;
    return next();
  };
}

module.exports = validate;
