const { accessSync, constants, existsSync } = require('node:fs');
const { spawnSync } = require('node:child_process');

if (process.env.CI === 'true' || !existsSync('.git/config')) {
  process.exit(0);
}

try {
  accessSync('.git/config', constants.W_OK);
} catch {
  process.exit(0);
}

const result = spawnSync('husky', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 0);
