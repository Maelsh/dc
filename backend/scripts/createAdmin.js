

// ============================================
// FILE: scripts/createAdmin.js
// Create Admin User Script
// ============================================

require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminEmail = process.argv[2] || 'admin@dueli.platform';
    const adminPassword = process.argv[3] || 'Admin@123456';

    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('❌ Admin user with this email already exists!');
      process.exit(1);
    }

    // Create admin user
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    const admin = await User.create({
      username: 'admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      bio: 'Platform Administrator',
      language: 'en',
      country: 'US'
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('═'.repeat(50));
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('═'.repeat(50));
    console.log('\n⚠️  Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  createAdmin();
}

module.exports = createAdmin;