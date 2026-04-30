const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const frontendDist = path.join(root, 'frontend', 'dist');
const adminDist = path.join(root, 'admin', 'dist');
const vercelDist = path.join(root, 'dist');
const adminTarget = path.join(vercelDist, 'admin');

if (!fs.existsSync(frontendDist)) {
  throw new Error('Missing frontend/dist. Run the frontend build first.');
}

if (!fs.existsSync(adminDist)) {
  throw new Error('Missing admin/dist. Run the admin build first.');
}

fs.rmSync(vercelDist, { recursive: true, force: true });
fs.mkdirSync(vercelDist, { recursive: true });
fs.cpSync(frontendDist, vercelDist, { recursive: true });

fs.mkdirSync(adminTarget, { recursive: true });
fs.cpSync(adminDist, adminTarget, { recursive: true });

console.log('Prepared Vercel output in dist');
