const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const env = require('../config/env');

const source = process.argv[2] ? path.resolve(process.argv[2]) : null;
const confirmed = process.argv.includes('--confirm');

if (!source || !fs.existsSync(source)) {
  throw new Error('Usage: node scripts/restore.js <backup-directory> --confirm');
}
if (!confirmed) {
  throw new Error('Restore is destructive. Re-run with --confirm after stopping the API.');
}

const manifestPath = path.join(source, 'manifest.json');
if (!fs.existsSync(manifestPath)) throw new Error('Backup manifest not found');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (manifest.databaseDriver === 'postgres') {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const dump = path.join(source, 'database.dump');
  const result = spawnSync(
    'pg_restore',
    ['--clean', '--if-exists', '--no-owner', '--dbname', process.env.DATABASE_URL, dump],
    { stdio: 'inherit', shell: process.platform === 'win32' }
  );
  if (result.status !== 0) throw new Error('pg_restore failed');
} else {
  const database = path.join(source, 'school.db');
  if (fs.existsSync(database)) {
    fs.mkdirSync(path.dirname(env.dbPath), { recursive: true });
    fs.copyFileSync(database, env.dbPath);
  }
}

const uploads = path.join(source, 'uploads');
if (fs.existsSync(uploads)) {
  const target = path.join(__dirname, '..', 'data', 'uploads');
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(uploads, target, { recursive: true });
}

console.log(`Backup restored from ${source}`);
