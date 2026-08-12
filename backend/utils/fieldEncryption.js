const crypto = require('crypto');
const env = require('../config/env');

const PREFIX = 'enc:v1:';

function encryptionKey() {
  const secret = env.piiEncryptionKey;
  if (!secret) {
    if (env.nodeEnv === 'production') {
      throw new Error('PII_ENCRYPTION_KEY is required in production');
    }
    return crypto.createHash('sha256').update(env.jwtSecret).digest();
  }
  return crypto.createHash('sha256').update(secret).digest();
}

function isEncrypted(value) {
  return typeof value === 'string' && value.startsWith(PREFIX);
}

function encrypt(value) {
  if (value === null || value === undefined || value === '') return value;
  if (isEncrypted(value)) return value;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(String(value), 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return [
    PREFIX.slice(0, -1),
    iv.toString('base64url'),
    tag.toString('base64url'),
    ciphertext.toString('base64url'),
  ].join(':');
}

function decrypt(value) {
  if (!isEncrypted(value)) return value;
  const [, , ivPart, tagPart, ciphertextPart] = value.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    encryptionKey(),
    Buffer.from(ivPart, 'base64url')
  );
  decipher.setAuthTag(Buffer.from(tagPart, 'base64url'));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextPart, 'base64url')),
    decipher.final(),
  ]).toString('utf8');
}

function blindIndex(value) {
  if (!value) return null;
  return crypto
    .createHmac('sha256', encryptionKey())
    .update(String(value))
    .digest('hex');
}

function maskDigits(value, visible = 4) {
  const plain = String(decrypt(value) || '').replace(/\D/g, '');
  if (!plain) return '';
  return `${'X'.repeat(Math.max(plain.length - visible, 0))}${plain.slice(-visible)}`;
}

module.exports = {
  encrypt,
  decrypt,
  blindIndex,
  isEncrypted,
  maskDigits,
};
