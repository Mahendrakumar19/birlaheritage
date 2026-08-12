const fs = require('fs');

function readPrefix(filePath, bytes = 16) {
  const fd = fs.openSync(filePath, 'r');
  try {
    const buffer = Buffer.alloc(bytes);
    const length = fs.readSync(fd, buffer, 0, bytes, 0);
    return buffer.subarray(0, length);
  } finally {
    fs.closeSync(fd);
  }
}

function isAllowedFileSignature(filePath, mimeType) {
  const bytes = readPrefix(filePath, mimeType === 'application/pdf' ? 1024 : 16);
  const ascii = bytes.toString('ascii');

  switch (mimeType) {
    case 'image/jpeg':
      return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case 'image/png':
      return bytes.length >= 8 && bytes.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      );
    case 'image/webp':
      return ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP';
    case 'image/gif':
      return ascii.startsWith('GIF87a') || ascii.startsWith('GIF89a');
    case 'application/pdf':
      // ISO 32000 readers permit arbitrary bytes before the PDF header as long
      // as it appears within the first 1024 bytes.
      return ascii.includes('%PDF-');
    default:
      return false;
  }
}

module.exports = { isAllowedFileSignature };
