const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { spawnSync } = require('node:child_process');

const testsDir = join(__dirname, '../tests');
const files = readdirSync(testsDir)
  .filter(f => f.endsWith('.test.cjs'))
  .sort()
  .map(f => join('tests', f));

const result = spawnSync(process.execPath, ['--test', ...files], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
