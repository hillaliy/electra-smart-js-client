const { spawnSync } = require('node:child_process');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const cacheDir = process.env.PACKAGE_CHECK_NPM_CACHE ?? join(tmpdir(), 'electra-smart-js-client-npm-cache');

const result = spawnSync('npm', ['pack', '--dry-run', '--json', '--cache', cacheDir], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const jsonStart = result.stdout.lastIndexOf('\n[');
const packageInfo = JSON.parse(result.stdout.slice(jsonStart === -1 ? 0 : jsonStart + 1))[0];
const files = new Set(packageInfo.files.map((file) => file.path));

const requiredFiles = ['lib/index.js', 'lib/index.d.ts'];
const missingFiles = requiredFiles.filter((file) => !files.has(file));

if (missingFiles.length > 0) {
  console.error(`Package is missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log(`Package check passed with ${packageInfo.files.length} files.`);
