const http = require('http');
const env = require('../config/env');

function request(method, path, body, headers = {}) {
  const payload = body ? JSON.stringify(body) : null;
  const options = {
    hostname: '127.0.0.1',
    port: env.port,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      ...headers,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {
          json = data;
        }
        resolve({ status: res.statusCode, body: json });
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  const health = await request('GET', '/api/health');
  console.log('HEALTH', health.status, health.body?.success);

  const admission = await request('POST', '/api/admissions', {
    studentFirstName: 'Kabir',
    studentLastName: 'Singh',
    studentDob: '2019-01-20',
    studentAadhaar: '998877665544',
    grade: 'nursery',
    parentGuardianName: 'Amit Singh',
    phone: '9988776655',
    email: 'amit.singh@example.com',
    streetAddress: 'Station Road',
    streetAddressLine2: 'Ward 4',
    city: 'Siwan',
    state: 'Bihar',
    pinCode: '841226',
    country: 'india',
  });
  console.log('ADMISSION', admission.status, admission.body?.success, admission.body?.data?.id);

  const invalid = await request('POST', '/api/admissions', {
    studentFirstName: 'X',
    email: 'bad',
  });
  console.log('ADMISSION_INVALID', invalid.status, invalid.body?.message);

  const contact = await request('POST', '/api/contact', {
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '9876501234',
    message: 'Please share the fee structure for Grade 5.',
  });
  console.log('CONTACT', contact.status, contact.body?.success, contact.body?.data?.id);

  const list = await request('GET', '/api/admissions', null, {
    'x-api-key': env.adminApiKey,
  });
  console.log('LIST_ADMISSIONS', list.status, list.body?.meta?.total);

  const ok =
    health.status === 200 &&
    admission.status === 201 &&
    invalid.status === 422 &&
    contact.status === 201 &&
    list.status === 200;

  if (!ok) {
    console.error('Smoke test FAILED');
    process.exit(1);
  }

  console.log('Smoke test PASSED');
}

main().catch((err) => {
  console.error('Smoke test error:', err.message);
  process.exit(1);
});
