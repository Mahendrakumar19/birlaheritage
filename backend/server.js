const express = require('express');
const path    = require('path');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const { initDb, closeDb } = require('./config/db');
const apiRoutes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const requestContext = require('./middleware/requestContext');
const logger = require('./utils/logger');

const app = express();

app.set('trust proxy', env.trustProxy);
app.disable('x-powered-by');
app.use(requestContext);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'authorization', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Serve uploaded gallery images
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'data', 'uploads'), {
    maxAge: '7d',
    immutable: false,
  })
);

const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

app.use('/api', limiter);

app.get('/', (req, res) => {
  if (!env.isDev) {
    return res.json({
      success: true,
      message: 'Birla Heritage School API',
      version: '3.0.0',
    });
  }
  res.json({
    success: true,
    message: 'Birla Heritage School API',
    version: '2.0.0',
    docs: {
      health:                 'GET    /api/health',
      // Contact Messages
      contactCreate:          'POST   /api/contact',
      contactList:            'GET    /api/contact           (x-api-key) ?status= ?limit= ?offset=',
      contactGet:             'GET    /api/contact/:id       (x-api-key)',
      contactUpdateStatus:    'PATCH  /api/contact/:id/status (x-api-key) { status }',
      contactDelete:          'DELETE /api/contact/:id       (x-api-key)',
      // Admission Enquiries
      admissionCreate:        'POST   /api/admissions',
      admissionList:          'GET    /api/admissions        (x-api-key) ?status= ?grade= ?limit= ?offset=',
      admissionGet:           'GET    /api/admissions/:id    (x-api-key)',
      admissionUpdateStatus:  'PATCH  /api/admissions/:id/status (x-api-key) { status }',
      admissionDelete:          'DELETE /api/admissions/:id       (x-api-key)',
      // Gallery
      galleryList:              'GET    /api/gallery              ?collection= &active= &limit= &offset=',
      galleryGet:               'GET    /api/gallery/:id',
      galleryCreate:            'POST   /api/gallery              (x-api-key) multipart: image file',
      galleryUpdate:            'PATCH  /api/gallery/:id          (x-api-key) { title?, description?, altText?, sortOrder? }',
      galleryToggle:            'PATCH  /api/gallery/:id/toggle   (x-api-key)',
      galleryReorder:           'PATCH  /api/gallery/reorder      (x-api-key) { items: [{ id, sortOrder }] }',
      galleryDelete:            'DELETE /api/gallery/:id          (x-api-key)',
      // Announcements (Banner)
      announcementActive:       'GET    /api/announcements/active  (public)',
      announcementList:         'GET    /api/announcements         (x-api-key) ?active= &limit= &offset=',
      announcementGet:          'GET    /api/announcements/:id     (x-api-key)',
      announcementCreate:       'POST   /api/announcements         (x-api-key) { text, emoji?, linkUrl?, linkLabel?, priority?, isActive?, startsAt?, endsAt? }',
      announcementUpdate:       'PATCH  /api/announcements/:id     (x-api-key)',
      announcementToggle:       'PATCH  /api/announcements/:id/toggle (x-api-key)',
      announcementDelete:       'DELETE /api/announcements/:id     (x-api-key)',
    },
    contactStatuses:   ['new', 'read', 'replied', 'archived'],
    admissionStatuses: ['new', 'under_review', 'accepted', 'rejected', 'archived'],
    grades:            ['nursery', 'lkg', 'ukg', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await initDb();
  const server = app.listen(env.port, env.host, () => {
    logger.info('server_started', {
      address: `http://${env.host}:${env.port}`,
      database: env.dbPath,
      environment: env.nodeEnv,
    });
  });

  const shutdown = (signal) => {
    logger.info('server_shutdown_started', { signal });
    server.close(() => {
      closeDb();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

if (require.main === module) {
  start().catch((err) => {
    logger.error('server_start_failed', { error: { message: err.message, stack: err.stack } });
    process.exit(1);
  });
}

module.exports = app;
