// ============================================
// FILE: config/encryption.js
// AES-256-GCM Encryption Utilities
// ============================================

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Must be 32 bytes (64 hex chars)
const IV_LENGTH = 16; // 16 bytes for AES

/**
 * Encrypt data using AES-256-GCM
 * @param {string} text - Text to encrypt
 * @returns {object} - Object containing iv, encryptedData, and authTag
 */
const encrypt = (text) => {
  if (!text) {
    throw new Error('Cannot encrypt empty text');
  }

  if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex')
  };
};

/**
 * Decrypt data using AES-256-GCM
 * @param {object} encrypted - Object containing iv, encryptedData, and authTag
 * @returns {string} - Decrypted text
 */
const decrypt = (encrypted) => {
  if (!encrypted || !encrypted.iv || !encrypted.encryptedData || !encrypted.authTag) {
    throw new Error('Invalid encrypted data format');
  }

  if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));

  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

/**
 * Generate a random encryption key (for setup)
 * @returns {string} - 64 character hex string
 */
const generateKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  encrypt,
  decrypt,
  generateKey
};
