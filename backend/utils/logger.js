const REDACTED_KEYS = new Set([
  'authorization',
  'cookie',
  'password',
  'passwordHash',
  'studentAadhaar',
  'aadhaar',
  'token',
  'refreshToken',
]);

function redact(value) {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(redact);

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      REDACTED_KEYS.has(key) ? '[REDACTED]' : redact(item),
    ])
  );
}

function write(level, message, metadata = {}) {
  const record = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...redact(metadata),
  };
  const output = JSON.stringify(record);
  if (level === 'error') console.error(output);
  else if (level === 'warn') console.warn(output);
  else console.log(output);
}

module.exports = {
  info: (message, metadata) => write('info', message, metadata),
  warn: (message, metadata) => write('warn', message, metadata),
  error: (message, metadata) => write('error', message, metadata),
  redact,
};
