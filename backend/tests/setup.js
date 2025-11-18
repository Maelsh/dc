// ============================================
// FILE: tests/setup.js
// Test Setup and Configuration
// ============================================

require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');

// Set test timeout
jest.setTimeout(30000);

// Connect to test database before all tests
beforeAll(async () => {
  const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/dueli_test';
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clear database after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
