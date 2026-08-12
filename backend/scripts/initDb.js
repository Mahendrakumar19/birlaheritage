const fs = require('fs');
const env = require('../config/env');
const { initDb, all, closeDb } = require('../config/db');

(async () => {
  await initDb();
  const tables = all(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  ).map((t) => t.name);

  console.log('DB path:', env.dbPath);
  console.log('DB exists:', fs.existsSync(env.dbPath));
  console.log('Tables:', tables.join(', ') || '(none)');
  closeDb();
  console.log('Database initialized successfully.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
