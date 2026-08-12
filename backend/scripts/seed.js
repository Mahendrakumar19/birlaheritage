const { initDb, closeDb } = require('../config/db');
const AdmissionEnquiry = require('../models/AdmissionEnquiry');
const ContactMessage = require('../models/ContactMessage');

(async () => {
  await initDb();

  const admission = AdmissionEnquiry.create(
    {
      studentFirstName: 'Aarav',
      studentLastName: 'Sharma',
      studentDob: '2018-05-12',
      studentAadhaar: '123456789012',
      grade: '1',
      parentGuardianName: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul.sharma@example.com',
      streetAddress: 'Markan Road',
      streetAddressLine2: 'Near Andar Dhala',
      city: 'Siwan',
      state: 'Bihar',
      pinCode: '841226',
      country: 'india',
    },
    { ipAddress: '127.0.0.1', userAgent: 'seed-script' }
  );

  const contact = ContactMessage.create(
    {
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      phone: '9123456789',
      message: 'I would like to schedule a campus tour next week.',
    },
    { ipAddress: '127.0.0.1', userAgent: 'seed-script' }
  );

  console.log('Seeded admission id:', admission.id);
  console.log('Seeded contact id:', contact.id);
  closeDb();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
