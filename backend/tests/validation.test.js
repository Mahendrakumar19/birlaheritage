const test = require('node:test');
const assert = require('node:assert/strict');

const { admissionSchema } = require('../validations/admissionValidation');
const { contactSchema } = require('../validations/contactValidation');

const validAdmission = {
  studentFirstName: 'Aarav',
  studentLastName: 'Sharma',
  studentDob: '2018-05-12',
  studentAadhaar: '1234 5678 9012',
  grade: '5',
  parentGuardianName: 'Rahul Sharma',
  phone: '9876543210',
  email: 'PARENT@EXAMPLE.COM',
  streetAddress: 'Main Road',
  streetAddressLine2: '',
  city: 'Siwan',
  state: 'Bihar',
  pinCode: '841226',
  country: 'india',
};

test('admission validation normalizes sensitive identifiers', () => {
  const parsed = admissionSchema.parse(validAdmission);
  assert.equal(parsed.studentAadhaar, '123456789012');
  assert.equal(parsed.email, 'parent@example.com');
});

test('admission validation rejects future DOB and invalid phone', () => {
  const result = admissionSchema.safeParse({
    ...validAdmission,
    studentDob: '2999-01-01',
    phone: '123',
  });
  assert.equal(result.success, false);
  const fields = result.error.issues.map((issue) => issue.path.join('.'));
  assert.ok(fields.includes('studentDob'));
  assert.ok(fields.includes('phone'));
});

test('contact validation rejects short messages', () => {
  const result = contactSchema.safeParse({
    name: 'Parent',
    email: 'parent@example.com',
    phone: '9876543210',
    message: 'short',
  });
  assert.equal(result.success, false);
});
