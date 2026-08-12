const path   = require('path');
const fs     = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const UPLOAD_DIR = path.join(__dirname, '..', 'data', 'uploads', 'gallery');

// Ensure upload directory exists on startup
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
const EXTENSION_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
  'image/heic': '.heic',
  'image/heif': '.heif',
  'image/bmp': '.bmp',
  'image/tiff': '.tiff',
  'image/svg+xml': '.svg',
};
const MAX_SIZE_MB  = 10;

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename(_req, file, cb) {
    const ext = EXTENSION_BY_MIME[file.mimetype] || path.extname(file.originalname) || '.img';
    cb(null, `gallery_${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

/**
 * Delete a file from the gallery uploads directory (best-effort)
 * @param {string} imagePath  - value stored in DB, e.g. "/uploads/gallery/gallery_xxx.jpg"
 */
function deleteUploadedFile(imagePath) {
  if (!imagePath) return;
  const rel  = path.basename(imagePath.replace(/^\/uploads\/gallery\//, ''));
  const full = path.join(UPLOAD_DIR, rel);
  try {
    if (fs.existsSync(full)) fs.unlinkSync(full);
  } catch (err) {
    console.warn('[gallery] Could not delete file:', full, err.message);
  }
}

module.exports = { upload, deleteUploadedFile, UPLOAD_DIR };
