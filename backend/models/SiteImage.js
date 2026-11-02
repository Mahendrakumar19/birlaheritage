const { run, get, all, persist } = require('../config/db');

const DEFAULT_SLOTS = [
  // ── Hero Banners ──
  {
    slotKey: 'hero_slide_1',
    label: 'Homepage Hero Slide 1',
    category: 'Hero Banner',
    description: 'Main background image for first slide on Homepage',
    imageUrl: 'https://birlaheritagesiwan.com/uploads/gallery/gallery_b363d145-55b1-48dc-aad3-4e860c6cbbd7.jpg',
    title: 'Empowering Minds,\nShaping Future Leaders',
    subtitle: 'BIRLA HERITAGE INTERNATIONAL SCHOOL',
    caption: 'Fostering academic excellence, character, and 21st-century skills in Siwan, Bihar.',
    altText: 'Birla Heritage International School Campus',
  },
  {
    slotKey: 'hero_slide_2',
    label: 'Homepage Hero Slide 2',
    category: 'Hero Banner',
    description: 'Background image for second slide on Homepage',
    imageUrl: 'https://birlaheritagesiwan.com/uploads/gallery/gallery_14d0881e-104e-4a49-9592-6878f54394d9.jpg',
    title: 'Empowering Students\nFor a Better Tomorrow',
    subtitle: 'WORLD CLASS EDUCATION',
    caption: 'Discover a diverse community of learners and educators.',
    altText: 'World class learning environment',
  },
  {
    slotKey: 'hero_slide_3',
    label: 'Homepage Hero Slide 3',
    category: 'Hero Banner',
    description: 'Background image for third slide on Homepage',
    imageUrl: 'https://birlaheritagesiwan.com/uploads/gallery/gallery_6d349b6b-4e29-47cb-acbf-beef08bf8daa.jpg',
    title: 'A Legacy of Excellence\nin Education',
    subtitle: 'FUTURE-READY LEARNING',
    caption: 'Fostering holistic development and global citizenship.',
    altText: 'Future-ready academic excellence',
  },

  // ── Campus Facilities (CampusPreview & Campus Life) ──
  {
    slotKey: 'facility_classrooms',
    label: 'Facility: Interactive Classrooms',
    category: 'Campus Facilities',
    description: 'Featured image for modern classrooms and learning spaces',
    imageUrl: '/about_main.png',
    title: 'Interactive Learning Spaces',
    subtitle: 'Modern Learning Spaces',
    caption: 'Designed to foster active student participation and collaborative learning.',
    altText: 'Interactive Classrooms',
  },
  {
    slotKey: 'facility_stem_labs',
    label: 'Facility: STEM & Practical Discovery',
    category: 'Campus Facilities',
    description: 'Featured image for science experiments and STEM discovery lab',
    imageUrl: '/obj_research_1785831334762.png',
    title: 'STEM & Practical Discovery',
    subtitle: 'Science & Analytical Exploration',
    caption: 'Dedicated facilities for hands-on experimentation and scientific inquiry.',
    altText: 'STEM Lab & Experiments',
  },
  {
    slotKey: 'facility_library',
    label: 'Facility: Library & Resource Center',
    category: 'Campus Facilities',
    description: 'Featured image for the school library and knowledge center',
    imageUrl: '/about_small.png',
    title: 'Library & Resource Center',
    subtitle: 'Literary & Research Access',
    caption: 'Curated collections of reading materials, reference guides, and quiet reading areas.',
    altText: 'School Library & Knowledge Center',
  },

  // ── About Us & Philosophy ──
  {
    slotKey: 'about_campus_photo',
    label: 'About Us: Campus Overview',
    category: 'About School',
    description: 'The featured campus photo shown in About Us introduction section',
    imageUrl: '/about_small.jpeg',
    title: 'Birla Heritage Campus',
    subtitle: 'Pollution-Free Green Campus',
    caption: 'State-of-the-art infrastructure nested in the serene region of Siwan.',
    altText: 'Birla Heritage Campus View',
  },
  {
    slotKey: 'philosophy_tagore',
    label: 'Philosophy: Creative Spirit Banner',
    category: 'About School',
    description: 'Tagore quote / educational philosophy backdrop',
    imageUrl: '/creative_college_bg.png',
    title: 'Joy of Learning & Creative Spirit',
    subtitle: 'Educational Ethos',
    caption: 'Nurturing curiosity, creativity, and confidence in every learner.',
    altText: 'Tagore philosophy educational backdrop',
  },

  // ── Leadership Section Portraits ──
  {
    slotKey: 'leadership_chairman',
    label: 'Leadership: Chairman Portrait',
    category: 'Leadership',
    description: 'Official portrait photo for Chairman Nitya Singh',
    imageUrl: '/chairman_placeholder.jpeg',
    title: 'Nitya Singh',
    subtitle: 'Chairman',
    caption: 'Education is the manifestation of perfection already in man.',
    altText: 'Chairman Nitya Singh',
  },
  {
    slotKey: 'leadership_director',
    label: 'Leadership: Director Portrait',
    category: 'Leadership',
    description: 'Official portrait photo for Director Subash Singh',
    imageUrl: '/team_placeholder.jpeg',
    title: 'Subash Singh',
    subtitle: 'Director',
    caption: 'Giving children a smooth learning environment to reach greatest potential.',
    altText: 'Director Subash Singh',
  },
  {
    slotKey: 'leadership_principal',
    label: 'Leadership: Principal Portrait',
    category: 'Leadership',
    description: 'Official portrait photo for Office of the Principal',
    imageUrl: '/team_placeholder.jpeg',
    title: 'Principal',
    subtitle: 'Office of the Principal',
    caption: 'Leading school administration, pedagogy governance, and future-ready student development.',
    altText: 'Principal',
  },
  {
    slotKey: 'leadership_vice_principal',
    label: 'Leadership: Vice Principal Portrait',
    category: 'Leadership',
    description: 'Official portrait photo for Office of the Vice Principal',
    imageUrl: '/team_placeholder.jpeg',
    title: 'Vice Principal',
    subtitle: 'Office of the Vice Principal',
    caption: 'Committed to holistic education, nurturing every unique child.',
    altText: 'Vice Principal',
  },
  {
    slotKey: 'leadership_coordinator',
    label: 'Leadership: School Coordinator Portrait',
    category: 'Leadership',
    description: 'Official portrait photo for Office of the School Coordinator',
    imageUrl: '/team_placeholder.jpeg',
    title: 'School Coordinator',
    subtitle: 'Office of the School Coordinator',
    caption: 'Coordinating experiential learning projects, CCA, and parent partnerships.',
    altText: 'School Coordinator',
  },
];

const SELECT_FIELDS = `
  id,
  slot_key    AS slotKey,
  label,
  category,
  description,
  image_url   AS imageUrl,
  title,
  subtitle,
  caption,
  alt_text    AS altText,
  created_at  AS createdAt,
  updated_at  AS updatedAt
`;

function ensureTable() {
  run(`
    CREATE TABLE IF NOT EXISTS site_images (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_key    TEXT UNIQUE NOT NULL,
      label       TEXT NOT NULL,
      category    TEXT NOT NULL,
      description TEXT,
      image_url   TEXT NOT NULL,
      title       TEXT,
      subtitle    TEXT,
      caption     TEXT,
      alt_text    TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  run(`
    CREATE INDEX IF NOT EXISTS idx_site_images_slot
      ON site_images (slot_key);
  `);

  // Seed default slots if not existing
  for (const s of DEFAULT_SLOTS) {
    const existing = get(`SELECT id FROM site_images WHERE slot_key = ?`, [s.slotKey]);
    if (!existing) {
      run(`
        INSERT INTO site_images
          (slot_key, label, category, description, image_url, title, subtitle, caption, alt_text)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        s.slotKey,
        s.label,
        s.category,
        s.description || null,
        s.imageUrl,
        s.title || null,
        s.subtitle || null,
        s.caption || null,
        s.altText || null,
      ]);
    }
  }
  persist();
}

function listAll(category) {
  ensureTable();
  if (category && category !== 'all') {
    return all(`SELECT ${SELECT_FIELDS} FROM site_images WHERE category = ? ORDER BY id ASC`, [category]);
  }
  return all(`SELECT ${SELECT_FIELDS} FROM site_images ORDER BY id ASC`);
}

function findBySlot(slotKey) {
  ensureTable();
  return get(`SELECT ${SELECT_FIELDS} FROM site_images WHERE slot_key = ?`, [slotKey]);
}

function updateSlot(slotKey, { imageUrl, title, subtitle, caption, altText }) {
  ensureTable();
  const existing = findBySlot(slotKey);
  if (!existing) return null;

  run(`
    UPDATE site_images
    SET
      image_url  = COALESCE(?, image_url),
      title      = COALESCE(?, title),
      subtitle   = COALESCE(?, subtitle),
      caption    = COALESCE(?, caption),
      alt_text   = COALESCE(?, alt_text),
      updated_at = datetime('now')
    WHERE slot_key = ?
  `, [
    imageUrl !== undefined ? imageUrl : null,
    title !== undefined ? title : null,
    subtitle !== undefined ? subtitle : null,
    caption !== undefined ? caption : null,
    altText !== undefined ? altText : null,
    slotKey,
  ]);

  persist();
  return findBySlot(slotKey);
}

module.exports = {
  ensureTable,
  listAll,
  findBySlot,
  updateSlot,
};

