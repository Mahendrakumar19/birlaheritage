const fs = require('fs');
const path = require('path');

// Create a dummy PDF file
const dummyPdfPath = path.join(__dirname, 'dummy.pdf');
fs.writeFileSync(dummyPdfPath, '%PDF-1.4\n%EOF');

const formData = new FormData();
formData.append('title', 'Test Document');
formData.append('order', '1');
// fetch in Node 18+ supports Blob for files
const fileBlob = new Blob([fs.readFileSync(dummyPdfPath)], { type: 'application/pdf' });
formData.append('pdf', fileBlob, 'dummy.pdf');

fetch('http://localhost:5000/api/disclosures', {
  method: 'POST',
  // Simulate admin user (id=0) using legacy x-api-key if enabled
  headers: {
    'x-api-key': 'dev-admin-key-change-me'
  },
  body: formData
})
.then(res => res.text().then(text => ({ status: res.status, text })))
.then(data => {
  console.log('Response:', data);
  fs.unlinkSync(dummyPdfPath);
})
.catch(err => {
  console.error('Error:', err);
  fs.unlinkSync(dummyPdfPath);
});
