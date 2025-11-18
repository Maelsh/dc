// ============================================
// FILE: scripts/generateEncryptionKey.js
// Generate AES-256 Encryption Key
// ============================================

const crypto = require('crypto');

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║         DUELI PLATFORM - ENCRYPTION KEY GENERATOR         ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Generate 32 bytes (256 bits) for AES-256
const encryptionKey = crypto.randomBytes(32).toString('hex');

console.log('Your new AES-256 encryption key:');
console.log('═'.repeat(66));
console.log(encryptionKey);
console.log('═'.repeat(66));
console.log('\n⚠️  IMPORTANT:');
console.log('1. Copy this key to your .env file as ENCRYPTION_KEY');
console.log('2. Keep this key SECRET and NEVER commit it to git');
console.log('3. If you lose this key, you CANNOT decrypt existing data');
console.log('4. Use the same key across all server instances\n');

// Also generate JWT secret
const jwtSecret = crypto.randomBytes(64).toString('base64');

console.log('\nBonus: JWT Secret (also add to .env as JWT_SECRET):');
console.log('═'.repeat(66));
console.log(jwtSecret);
console.log('═'.repeat(66));
console.log('');