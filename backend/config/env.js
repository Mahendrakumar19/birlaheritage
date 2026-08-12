const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const toInt = (value, fallback) => {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) ? n : fallback;
};

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const nodeEnv = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET || '';
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || '';

if (nodeEnv === 'production' && jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be configured with at least 32 characters in production');
}

if (nodeEnv === 'production' && jwtRefreshSecret.length < 32) {
  throw new Error('JWT_REFRESH_SECRET must be configured with at least 32 characters in production');
}

if (
  nodeEnv === 'production' &&
  String(process.env.PII_ENCRYPTION_KEY || '').length < 32
) {
  throw new Error('PII_ENCRYPTION_KEY must be configured with at least 32 characters in production');
}

const env = {
  nodeEnv,
  port: toInt(process.env.PORT, 5000),
  host: process.env.HOST || '0.0.0.0',
  dbPath: path.resolve(
    __dirname,
    '..',
    process.env.DB_PATH || './data/school.db'
  ),
  corsOrigins: String(process.env.CORS_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  adminApiKey: process.env.ADMIN_API_KEY || '',
  jwtSecret: jwtSecret || (nodeEnv === 'production' ? '' : 'development-only-change-me-before-production'),
  jwtRefreshSecret:
    jwtRefreshSecret ||
    (nodeEnv === 'production' ? '' : 'development-refresh-only-change-me'),
  bootstrapAdminToken: process.env.BOOTSTRAP_ADMIN_TOKEN || '',
  allowAdminSignup: toBool(process.env.ALLOW_ADMIN_SIGNUP, false),
  piiEncryptionKey: process.env.PII_ENCRYPTION_KEY || '',
  cookieDomain: process.env.COOKIE_DOMAIN || '',
  trustProxy: process.env.TRUST_PROXY || (nodeEnv === 'production' ? '1' : 'loopback'),
  rateLimitWindowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: toInt(process.env.RATE_LIMIT_MAX, 100),
  isDev: nodeEnv !== 'production',
};

module.exports = env;
