const env = require('../config/env');
const { get } = require('../config/db');

function live(req, res) {
  return res.json({
    success: true,
    message: 'OK',
    data: {
      service: 'birla-heritage-backend',
      time: new Date().toISOString(),
    },
  });
}

async function ready(req, res) {
  let dbOk = false;
  try {
    const row = await get('SELECT 1 AS ok');
    dbOk = Number(row?.ok) === 1;
  } catch (err) {
    dbOk = false;
  }

  res.status(dbOk ? 200 : 503).json({
    success: dbOk,
    message: dbOk ? 'OK' : 'Database unavailable',
    data: {
      service: 'birla-heritage-backend',
      dbOk,
      time: new Date().toISOString(),
      ...(env.isDev
        ? {
            environment: env.nodeEnv,
            databaseDriver: env.databaseDriver || 'sqlite',
          }
        : {}),
    },
  });
}

module.exports = { live, ready, health: ready };
