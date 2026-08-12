/**
 * Seed script: populates default announcement if none exist.
 * Usage: node backend/scripts/seedAnnouncements.js
 */

const path = require('path');

const { initDb } = require(path.join(__dirname, '..', 'config', 'db'));
const Announcement = require(path.join(__dirname, '..', 'models', 'Announcement'));

async function seed() {
  await initDb();

  const existing = Announcement.list({ limit: 1 });
  if (existing.length > 0) {
    console.log(`Announcements already seeded (${existing.length} found). Skipping.`);
    process.exit(0);
  }

  const defaults = [
    {
      text: 'Welcome to Birla Heritage International School Siwan — Admissions Open for 2025–26!',
      emoji: '🎓',
      linkUrl: '/admissions',
      linkLabel: 'Apply Now',
      priority: 10,
      isActive: true,
    },
    {
      text: 'Explore our world-class campus, state-of-the-art facilities, and holistic education programs.',
      emoji: '🏫',
      linkUrl: '/about-us',
      linkLabel: 'Learn More',
      priority: 5,
      isActive: true,
    },
    {
      text: 'Join us for an Open House — Meet our faculty and explore our programs!',
      emoji: '📅',
      priority: 3,
      isActive: true,
    },
  ];

  for (const ann of defaults) {
    const created = Announcement.create(ann);
    console.log(`✓ Created announcement #${created.id}: "${created.text.slice(0, 60)}..."`);
  }

  console.log('\n✅ Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
