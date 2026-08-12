const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const env = require('../config/env');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupRoot = path.resolve(
  process.env.BACKUP_DIR || path.join(__dirname, '..', 'backups')
);
const destination = path.join(backupRoot, timestamp);
fs.mkdirSync(destination, { recursive: true });

const manifest = {
  createdAt: new Date().toISOString(),
  databaseDriver: env.databaseDriver || 'sqlite',
  files: [],
};

if ((env.databaseDriver || 'sqlite') === 'postgres') {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const output = path.join(destination, 'database.dump');
  const result = spawnSync(
    'pg_dump',
    ['--format=custom', '--file', output, process.env.DATABASE_URL],
    { stdio: 'inherit', shell: process.platform === 'win32' }
  );
  if (result.status !== 0) throw new Error('pg_dump failed');
  manifest.files.push('database.dump');
} else if (fs.existsSync(env.dbPath)) {
  fs.copyFileSync(env.dbPath, path.join(destination, 'school.db'));
  manifest.files.push('school.db');
}

const uploads = path.join(__dirname, '..', 'data', 'uploads');
if (fs.existsSync(uploads)) {
  fs.cpSync(uploads, path.join(destination, 'uploads'), {
    recursive: true,
    force: false,
  });
  manifest.files.push('uploads/');
}

fs.writeFileSync(
  path.join(destination, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Backup created: ${destination}`);
