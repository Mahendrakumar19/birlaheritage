const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const env = require('./env');

let db;
let readyPromise;

function ensureDir() {
  const dir = path.dirname(env.dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function persist() {
  if (!db) return;
  ensureDir();
  const data = db.export();
  fs.writeFileSync(env.dbPath, Buffer.from(data));
}

function migrate() {
  db.run(`
    CREATE TABLE IF NOT EXISTS admission_enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_first_name TEXT NOT NULL,
      student_last_name TEXT,
      student_dob TEXT NOT NULL,
      student_aadhaar TEXT NOT NULL,
      grade TEXT NOT NULL,
      parent_guardian_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      street_address TEXT NOT NULL,
      street_address_line2 TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pin_code TEXT NOT NULL,
      country TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_admission_email
      ON admission_enquiries (email);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_admission_phone
      ON admission_enquiries (phone);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_admission_created
      ON admission_enquiries (created_at);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_contact_email
      ON contact_messages (email);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_contact_created
      ON contact_messages (created_at);
  `);

  // ── Gallery Items ────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      collection  TEXT NOT NULL CHECK(collection IN ('campus', 'students-corner')),
      title       TEXT NOT NULL,
      description TEXT,
      image_path  TEXT NOT NULL,
      alt_text    TEXT,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_gallery_collection
      ON gallery_items (collection);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_gallery_sort
      ON gallery_items (collection, sort_order);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_gallery_active
      ON gallery_items (is_active);
  `);

  // ── Announcements (Marquee Banner) ───────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS announcements (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      text        TEXT NOT NULL,
      emoji       TEXT DEFAULT NULL,
      link_url    TEXT DEFAULT NULL,
      link_label  TEXT DEFAULT NULL,
      priority    INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1,
      starts_at   TEXT DEFAULT NULL,
      ends_at     TEXT DEFAULT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_announcements_active
      ON announcements (is_active);
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_announcements_priority
      ON announcements (priority DESC);
  `);

  // ── Admin Users ───────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      username     TEXT NOT NULL UNIQUE COLLATE NOCASE,
      email        TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      full_name    TEXT DEFAULT NULL,
      role         TEXT NOT NULL DEFAULT 'admin',
      is_active    INTEGER NOT NULL DEFAULT 1,
      last_login   TEXT DEFAULT NULL,
      created_at   TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_admin_users_username
      ON admin_users (username);
  `);

  // ── Mandatory Disclosures ──────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS mandatory_disclosures (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      title        TEXT NOT NULL,
      pdf_url      TEXT NOT NULL,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      created_at   TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── Events ───────────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      title             TEXT NOT NULL,
      category          TEXT NOT NULL DEFAULT 'Cultural',
      event_date        TEXT NOT NULL,
      short_description TEXT NOT NULL,
      description       TEXT,
      cover_image       TEXT,
      gallery_album_id  TEXT,
      is_published      INTEGER NOT NULL DEFAULT 1,
      sort_order        INTEGER NOT NULL DEFAULT 0,
      created_at        TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_events_published
      ON events (is_published);
  `);

  // ── Leadership Profiles ──────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS leadership_profiles (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      name           TEXT NOT NULL,
      designation    TEXT NOT NULL,
      role_tag       TEXT NOT NULL,
      image_path     TEXT NOT NULL,
      bio            TEXT NOT NULL,
      message        TEXT NOT NULL,
      sort_order     INTEGER NOT NULL DEFAULT 0,
      is_placeholder INTEGER NOT NULL DEFAULT 0,
      is_published   INTEGER NOT NULL DEFAULT 1,
      created_at     TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_leadership_published
      ON leadership_profiles (is_published);
  `);

  // ── Testimonials ─────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT NOT NULL,
      role         TEXT NOT NULL,
      quote        TEXT NOT NULL,
      image_path   TEXT NOT NULL,
      rating       INTEGER NOT NULL DEFAULT 5,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at   TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_testimonials_published
      ON testimonials (is_published);
  `);

  // ── Student Achievements ──────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS achievements (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name     TEXT NOT NULL,
      grade            TEXT NOT NULL,
      title            TEXT NOT NULL,
      category         TEXT NOT NULL DEFAULT 'Academic',
      achievement_date TEXT NOT NULL,
      description      TEXT,
      image_path       TEXT,
      is_published     INTEGER NOT NULL DEFAULT 1,
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_achievements_published
      ON achievements (is_published);
  `);

  // Seed initial admin user if table is empty
  const countRow = get(`SELECT COUNT(*) AS total FROM admin_users`);
  if (Number(countRow?.total || 0) === 0) {
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('Password@123', 10);
    run(
      `INSERT INTO admin_users (username, email, password_hash, full_name, role)
       VALUES (?, ?, ?, ?, ?)`,
      ['admin', 'admin@birlaheritage.com', hash, 'System Administrator', 'super_admin']
    );
  }

  persist();
}

async function initDb() {
  if (db) return db;
  if (readyPromise) return readyPromise;

  readyPromise = (async () => {
    ensureDir();
    const SQL = await initSqlJs();

    if (fs.existsSync(env.dbPath)) {
      const fileBuffer = fs.readFileSync(env.dbPath);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    migrate();
    return db;
  })();

  return readyPromise;
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() before using getDb().');
  }
  return db;
}

function run(sql, params = []) {
  getDb().run(sql, params);
}

function lastInsertId() {
  // Must be read BEFORE persist()/export() — export resets last_insert_rowid in sql.js
  const result = getDb().exec('SELECT last_insert_rowid() AS id');
  return Number(result?.[0]?.values?.[0]?.[0] || 0);
}

function get(sql, params = []) {
  const stmt = getDb().prepare(sql);
  try {
    if (params.length) stmt.bind(params);
    if (stmt.step()) {
      return stmt.getAsObject();
    }
    return undefined;
  } finally {
    stmt.free();
  }
}

function all(sql, params = []) {
  const stmt = getDb().prepare(sql);
  try {
    if (params.length) stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    return rows;
  } finally {
    stmt.free();
  }
}

function closeDb() {
  if (db) {
    persist();
    db.close();
    db = null;
    readyPromise = null;
  }
}

module.exports = {
  initDb,
  getDb,
  closeDb,
  persist,
  run,
  lastInsertId,
  get,
  all,
};
