const assert = require('node:assert/strict');

const baseUrl = process.env.TEST_API_URL || 'http://127.0.0.1:5051';
const bootstrapToken = process.env.TEST_BOOTSTRAP_TOKEN || 'integration-bootstrap-token';

if (process.env.ALLOW_INTEGRATION_TESTS !== 'true') {
  throw new Error('Set ALLOW_INTEGRATION_TESTS=true and use an isolated test database');
}

class Session {
  constructor() {
    this.cookies = new Map();
  }

  capture(response) {
    const values = typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : [response.headers.get('set-cookie')].filter(Boolean);
    for (const header of values) {
      const pair = header.split(';', 1)[0];
      const separator = pair.indexOf('=');
      this.cookies.set(pair.slice(0, separator), pair.slice(separator + 1));
    }
  }

  async request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (this.cookies.size) {
      headers.set(
        'cookie',
        [...this.cookies.entries()].map(([key, value]) => `${key}=${value}`).join('; ')
      );
    }
    if (options.body && !(options.body instanceof FormData) && !headers.has('content-type')) {
      headers.set('content-type', 'application/json');
    }
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
    this.capture(response);
    const json = await response.json().catch(() => ({}));
    return { response, json };
  }
}

async function expectStatus(session, path, status, options) {
  const result = await session.request(path, options);
  assert.equal(
    result.response.status,
    status,
    `${options?.method || 'GET'} ${path}: ${JSON.stringify(result.json)}`
  );
  return result.json;
}

async function main() {
  const anonymous = new Session();
  await expectStatus(anonymous, '/api/health/live', 200);
  await expectStatus(anonymous, '/api/health/ready', 200);

  const signup = {
    username: 'enterprise_admin',
    email: 'enterprise.admin@example.com',
    password: 'Strong-Integration-Password-123!',
    fullName: 'Enterprise Admin',
  };

  await expectStatus(anonymous, '/api/auth/signup', 403, {
    method: 'POST',
    body: JSON.stringify(signup),
  });

  let admin = new Session();
  const createdAdmin = await expectStatus(admin, '/api/auth/signup', 201, {
    method: 'POST',
    headers: { 'x-bootstrap-token': bootstrapToken },
    body: JSON.stringify(signup),
  });
  assert.equal(createdAdmin.user.role, 'super_admin');
  assert.equal('token' in createdAdmin, false, 'JWT must not be exposed to JavaScript');

  await expectStatus(new Session(), '/api/auth/signup', 403, {
    method: 'POST',
    headers: { 'x-bootstrap-token': bootstrapToken },
    body: JSON.stringify({ ...signup, username: 'second_admin', email: 'second@example.com' }),
  });

  await expectStatus(admin, '/api/auth/logout', 200, { method: 'POST' });
  await expectStatus(admin, '/api/admissions', 401);

  admin = new Session();
  const login = await expectStatus(admin, '/api/auth/login', 200, {
    method: 'POST',
    body: JSON.stringify({
      username: signup.username,
      password: signup.password,
    }),
  });
  assert.equal(login.user.username, signup.username);
  await expectStatus(admin, '/api/auth/verify', 200, { method: 'POST' });
  await expectStatus(admin, '/api/admin-users', 200);

  const viewerPassword = 'Strong-Viewer-Password-123!';
  await expectStatus(admin, '/api/admin-users', 201, {
    method: 'POST',
    body: JSON.stringify({
      username: 'integration_viewer',
      email: 'integration.viewer@example.com',
      password: viewerPassword,
      role: 'viewer',
    }),
  });
  const viewer = new Session();
  await expectStatus(viewer, '/api/auth/login', 200, {
    method: 'POST',
    body: JSON.stringify({
      username: 'integration_viewer',
      password: viewerPassword,
    }),
  });

  const admissionPayload = {
    studentFirstName: 'Integration',
    studentLastName: 'Student',
    studentDob: '2018-05-12',
    studentAadhaar: '123456789012',
    grade: '5',
    parentGuardianName: 'Integration Parent',
    phone: '9876543210',
    email: 'integration.parent@example.com',
    streetAddress: 'Main Road',
    streetAddressLine2: '',
    city: 'Siwan',
    state: 'Bihar',
    pinCode: '841226',
    country: 'india',
  };
  const admission = await expectStatus(anonymous, '/api/admissions', 201, {
    method: 'POST',
    body: JSON.stringify(admissionPayload),
  });
  assert.equal('studentAadhaar' in admission.data, false);

  const admissions = await expectStatus(admin, '/api/admissions?limit=10', 200);
  const savedAdmission = admissions.data.find((item) => item.email === admissionPayload.email);
  assert.ok(savedAdmission);
  assert.equal(savedAdmission.studentAadhaar, 'XXXXXXXX9012');

  const sensitive = await expectStatus(
    admin,
    `/api/admissions/${savedAdmission.id}/sensitive`,
    200
  );
  assert.equal(sensitive.data.studentAadhaar, admissionPayload.studentAadhaar);
  await expectStatus(viewer, '/api/admissions?limit=10', 200);
  await expectStatus(viewer, `/api/admissions/${savedAdmission.id}/status`, 403, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'accepted' }),
  });
  await expectStatus(admin, `/api/admissions/${savedAdmission.id}/status`, 200, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'under_review' }),
  });

  const contactPayload = {
    name: 'Integration Parent',
    email: 'integration.contact@example.com',
    phone: '9876543210',
    message: 'Please share admission and transport details.',
  };
  await expectStatus(anonymous, '/api/contact', 201, {
    method: 'POST',
    body: JSON.stringify(contactPayload),
  });
  const contacts = await expectStatus(admin, '/api/contact?limit=10', 200);
  const contact = contacts.data.find((item) => item.email === contactPayload.email);
  assert.ok(contact);
  await expectStatus(admin, `/api/contact/${contact.id}/status`, 200, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'read' }),
  });

  const announcement = await expectStatus(admin, '/api/announcements', 201, {
    method: 'POST',
    body: JSON.stringify({
      text: 'Integration announcement',
      isActive: true,
      priority: 99,
    }),
  });
  const activeAnnouncements = await expectStatus(anonymous, '/api/announcements/active', 200);
  assert.ok(activeAnnouncements.data.some((item) => item.id === announcement.data.id));
  await expectStatus(viewer, '/api/announcements', 403, {
    method: 'POST',
    body: JSON.stringify({ text: 'Viewer must not publish' }),
  });

  const fakeGalleryForm = new FormData();
  fakeGalleryForm.set('collection', 'campus');
  fakeGalleryForm.set('title', 'Fake image');
  fakeGalleryForm.set(
    'image',
    new Blob([Buffer.from('<script>not an image</script>')], { type: 'image/png' }),
    'fake.png'
  );
  await expectStatus(admin, '/api/gallery', 422, {
    method: 'POST',
    body: fakeGalleryForm,
  });

  const galleryForm = new FormData();
  galleryForm.set('collection', 'campus');
  galleryForm.set('title', 'Integration image');
  galleryForm.set(
    'image',
    new Blob([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]),
    ], { type: 'image/png' }),
    'integration.png'
  );
  const gallery = await expectStatus(admin, '/api/gallery', 201, {
    method: 'POST',
    body: galleryForm,
  });
  const publicGallery = await expectStatus(anonymous, '/api/gallery?active=true', 200);
  assert.ok(publicGallery.data.some((item) => item.id === gallery.data.id));

  const disclosureForm = new FormData();
  disclosureForm.set('title', 'Integration disclosure');
  disclosureForm.set('order', '999');
  disclosureForm.set(
    'pdf',
    new Blob(
      [Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from('\n%PDF-1.7\n%%EOF\n')],
      { type: 'application/octet-stream' }
    ),
    'integration.pdf'
  );
  const disclosure = await expectStatus(admin, '/api/disclosures', 201, {
    method: 'POST',
    body: disclosureForm,
  });
  const publicDisclosures = await expectStatus(anonymous, '/api/disclosures', 200);
  assert.ok(publicDisclosures.data.some(
    (item) => item.id === disclosure.data.id || item._id === disclosure.data._id
  ));

  await expectStatus(admin, '/api/auth/refresh', 200, { method: 'POST' });
  await expectStatus(admin, '/api/auth/logout', 200, { method: 'POST' });
  await expectStatus(admin, '/api/admissions', 401);

  console.log('Enterprise integration test PASSED');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
