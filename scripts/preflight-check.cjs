#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const envFile = process.argv[2] || path.join(root, '.env');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const parsed = {};
  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

const env = { ...parseEnvFile(envFile), ...process.env };
const errors = [];
const warnings = [];

const requireHttps = (key) => {
  const value = (env[key] || '').trim();
  if (!value) { errors.push(`${key} is missing`); return; }
  if (!value.startsWith('https://')) errors.push(`${key} must use https:// in production (got: ${value})`);
  if (/localhost|127\.0\.0\.1/i.test(value)) errors.push(`${key} must not point to localhost in production`);
};

// 1. Database credentials
if (!env.DATABASE_URL) {
  if (!env.POSTGRES_USER) errors.push('POSTGRES_USER is missing (or provide DATABASE_URL)');
  if (!env.POSTGRES_DB) errors.push('POSTGRES_DB is missing (or provide DATABASE_URL)');
  const pass = env.POSTGRES_PASSWORD || '';
  if (!pass || pass === 'luxe_password' || pass.includes('CHANGE_ME') || pass.length < 12) {
    errors.push('POSTGRES_PASSWORD must be a strong non-default password (>= 12 characters)');
  }
}

// 2. Public HTTPS origins
requireHttps('FRONTEND_ORIGIN');
requireHttps('API_PUBLIC_URL');

// 3. Admin mobile numbers
const admins = (env.ADMIN_MOBILES || '').split(',').map(v => v.trim()).filter(Boolean);
if (!admins.length) errors.push('ADMIN_MOBILES must include at least one Iranian mobile number');
for (const mobile of admins) {
  if (!/^(?:09|\+?989|00989)\d{9}$/.test(mobile.replace(/[\s()-]/g, ''))) {
    errors.push(`ADMIN_MOBILES contains invalid mobile number: ${mobile}`);
  }
}
if (admins.includes('09123456789') || admins.includes('09120000000')) {
  warnings.push('ADMIN_MOBILES contains a placeholder number; replace with real owner mobile(s)');
}

// 4. Payment gateway
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
if (env.ZARINPAL_SANDBOX === 'true') {
  warnings.push('ZARINPAL_SANDBOX is true (sandbox mode; live payments disabled)');
} else if (!uuidRe.test(env.ZARINPAL_MERCHANT_ID || '') || env.ZARINPAL_MERCHANT_ID === '00000000-0000-0000-0000-000000000000') {
  errors.push('ZARINPAL_MERCHANT_ID must be your live Zarinpal UUID when ZARINPAL_SANDBOX=false');
}

// 5. Production OTP SMS bridge
requireHttps('OTP_PROVIDER_URL');
if (!env.OTP_PROVIDER_TOKEN || env.OTP_PROVIDER_TOKEN.includes('CHANGE_ME')) {
  errors.push('OTP_PROVIDER_TOKEN must be set to your SMS bridge secret');
}

// 6. Proxy & seeding
if (env.TRUST_PROXY !== undefined && !/^[0-5]$/.test(String(env.TRUST_PROXY))) {
  errors.push('TRUST_PROXY must be an integer between 0 and 5');
}
if (env.SEED_CATALOG === 'true') {
  warnings.push('SEED_CATALOG is true; set SEED_CATALOG=false in production unless you want demo watches');
}

// 7. Storefront local assets check
const manifestPath = path.join(root, 'frontend/public/resourses/manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const missing = (manifest.assets || []).filter(a => !fs.existsSync(path.join(root, 'frontend/public/resourses', a.filename)));
  if (missing.length) warnings.push(`${missing.length} storefront image(s) missing; run: node scripts/download-resourses.cjs`);
}

console.log(`Preflight check (${path.relative(root, envFile) || '.env'})`);
for (const w of warnings) console.warn(`  [WARN]  ${w}`);
for (const e of errors) console.error(`  [ERROR] ${e}`);

if (errors.length) {
  console.error(`\nPreflight failed with ${errors.length} error(s). Fix them before deploying.`);
  process.exit(1);
}
console.log('\nPreflight passed! Ready to deploy.');
