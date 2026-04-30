const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const frontendDist = path.join(root, 'frontend', 'dist');
const adminDist = path.join(root, 'admin', 'dist');
const adminTarget = path.join(frontendDist, 'admin');

if (!fs.existsSync(frontendDist)) {
  throw new Error('Missing frontend/dist. Run the frontend build first.');
}

if (!fs.existsSync(adminDist)) {
  throw new Error('Missing admin/dist. Run the admin build first.');
}

fs.rmSync(adminTarget, { recursive: true, force: true });
fs.mkdirSync(adminTarget, { recursive: true });
fs.cpSync(adminDist, adminTarget, { recursive: true });

console.log('Copied admin/dist to frontend/dist/admin');
