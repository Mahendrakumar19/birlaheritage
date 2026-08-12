const path   = require('path');
const fs     = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const UPLOAD_DIR = path.join(__dirname, '..', 'data', 'uploads', 'pdfs');

// Ensure upload directory exists on startup
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const ALLOWED_MIME = ['application/pdf', 'application/octet-stream'];
const MAX_SIZE_MB  = 10;

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename(_req, file, cb) {
    cb(null, `disclosure_${crypto.randomUUID()}.pdf`);
  },
});

function fileFilter(_req, file, cb) {
  const isPdf = file.mimetype === 'application/pdf' || 
                file.originalname.toLowerCase().endsWith('.pdf');
  
  if (isPdf) {
    cb(null, true);
  } else {
    cb(
      Object.assign(new Error('Only PDF files are allowed.'), {
        statusCode: 422,
      }),
      false
    );
  }
}

const uploadPdf = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

/**
 * Delete a file from the pdf uploads directory (best-effort)
 * @param {string} filePath  - value stored in DB, e.g. "/uploads/pdfs/disclosure_xxx.pdf"
 */
function deleteUploadedPdf(filePath) {
  if (!filePath) return;
  const rel  = path.basename(filePath.replace(/^\/uploads\/pdfs\//, ''));
  const full = path.join(UPLOAD_DIR, rel);
  try {
    if (fs.existsSync(full)) fs.unlinkSync(full);
  } catch (err) {
    console.warn('[disclosure] Could not delete file:', full, err.message);
  }
}

module.exports = { uploadPdf, deleteUploadedPdf, UPLOAD_DIR };
