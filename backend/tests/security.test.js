const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  encrypt,
  decrypt,
  blindIndex,
  isEncrypted,
  maskDigits,
} = require('../utils/fieldEncryption');
const { isAllowedFileSignature } = require('../utils/fileSignature');
const { hasPermission } = require('../middleware/requireRole');

test('field encryption round-trips and masks Aadhaar', () => {
  const aadhaar = '123456789012';
  const encrypted = encrypt(aadhaar);
  assert.equal(isEncrypted(encrypted), true);
  assert.notEqual(encrypted, aadhaar);
  assert.equal(decrypt(encrypted), aadhaar);
  assert.equal(maskDigits(encrypted), 'XXXXXXXX9012');
  assert.equal(blindIndex(aadhaar), blindIndex(aadhaar));
});

test('field encryption uses a random IV', () => {
  assert.notEqual(encrypt('123456789012'), encrypt('123456789012'));
});

test('role permissions enforce least privilege', () => {
  assert.equal(hasPermission({ role: 'super_admin' }, 'content:write'), true);
  assert.equal(hasPermission({ role: 'content_editor' }, 'content:write'), true);
  assert.equal(hasPermission({ role: 'content_editor' }, 'admissions:write'), false);
  assert.equal(hasPermission({ role: 'viewer' }, 'contacts:write'), false);
});

test('file validation inspects signatures, not only extensions', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'birla-signature-'));
  const pdf = path.join(directory, 'document.pdf');
  const prefixedPdf = path.join(directory, 'prefixed.pdf');
  const fakePdf = path.join(directory, 'fake.pdf');
  fs.writeFileSync(pdf, Buffer.from('%PDF-1.7\n'));
  fs.writeFileSync(prefixedPdf, Buffer.concat([
    Buffer.from([0xef, 0xbb, 0xbf]),
    Buffer.from('\n%PDF-1.7\n'),
  ]));
  fs.writeFileSync(fakePdf, Buffer.from('<script>alert(1)</script>'));

  try {
    assert.equal(isAllowedFileSignature(pdf, 'application/pdf'), true);
    assert.equal(isAllowedFileSignature(prefixedPdf, 'application/pdf'), true);
    assert.equal(isAllowedFileSignature(fakePdf, 'application/pdf'), false);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
