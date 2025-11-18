

// ============================================
// FILE: scripts/seedDatabase.js
// Seed Database with Test Data
// ============================================

require('dotenv').config();
const mongoose = require('mongoose');
const { User, Challenge, Rating, Comment } = require('../models');
const bcrypt = require('bcrypt');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Challenge.deleteMany({});
    await Rating.deleteMany({});
    await Comment.deleteMany({});

    // Create test users
    console.log('Creating test users...');
    const passwordHash = await bcrypt.hash('Test@123', 10);

    const users = await User.create([
      {
        username: 'john_doe',
        email: 'john@test.com',
        passwordHash,
        bio: 'Science enthusiast and debater',
        language: 'en',
        country: 'US',
        preferredCategories: ['science', 'dialogue']
      },
      {
        username: 'jane_smith',
        email: 'jane@test.com',
        passwordHash,
        bio: 'Passionate about climate issues',
        language: 'en',
        country: 'US',
        preferredCategories: ['dialogue']
      },
      {
        username: 'ahmed_ali',
        email: 'ahmed@test.com',
        passwordHash,
        bio: 'مناقش في القضايا الدينية',
        language: 'ar',
        country: 'EG',
        preferredCategories: ['dialogue', 'science']
      },
      {
        username: 'maria_garcia',
        email: 'maria@test.com',
        passwordHash,
        bio: 'Talented singer and performer',
        language: 'es',
        country: 'ES',
        preferredCategories: ['talent']
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create test challenges
    console.log('Creating test challenges...');
    const challenges = await Challenge.create([
      {
        title: 'Climate Change: Fact or Fiction?',
        description: 'A debate on the reality and impact of climate change',
        category: 'dialogue',
        field: 'Environmental Issues',
        creator: users[0]._id,
        opponent: users[1]._id,
        status: 'completed',
        rules: {
          duration: 60,
          rounds: 3,
          roundDuration: 15,
          customRules: 'Cite scientific sources'
        },
        language: 'en',
        country: 'US',
        viewerCount: 250,
        peakViewers: 300,
        totalRevenue: 100,
        revenueDistribution: {
          platform: 20,
          creator: 40,
          opponent: 40
        },
        creatorRatingSum: 420,
        creatorRatingCount: 100,
        opponentRatingSum: 480,
        opponentRatingCount: 100,
        startedAt: new Date('2024-11-10T15:00:00Z'),
        endedAt: new Date('2024-11-10T16:00:00Z')
      },
      {
        title: 'Quantum Physics Explained',
        description: 'Discussion on quantum mechanics basics',
        category: 'science',
        field: 'Physics',
        creator: users[0]._id,
        opponent: users[2]._id,
        status: 'scheduled',
        rules: {
          duration: 90,
          rounds: 2,
          roundDuration: 30,
          customRules: 'Educational focus'
        },
        scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        language: 'en',
        country: 'US'
      },
      {
        title: 'Singing Competition',
        description: 'Show your vocal talents!',
        category: 'talent',
        field: 'Vocal Performance',
        creator: users[3]._id,
        status: 'pending',
        rules: {
          duration: 30,
          rounds: 1,
          customRules: 'Original songs only'
        },
        language: 'es',
        country: 'ES'
      }
    ]);

    console.log(`✅ Created ${challenges.length} challenges`);

    // Create follow relationships
    console.log('Creating social connections...');
    users[0].followers.push(users[1]._id, users[2]._id);
    users[0].following.push(users[1]._id);
    users[1].followers.push(users[0]._id);
    users[1].following.push(users[0]._id, users[2]._id);

    await Promise.all(users.map(u => u.save()));

    console.log('\n✅ Database seeded successfully!');
    console.log('═'.repeat(50));
    console.log('Test Users:');
    console.log('  - john@test.com / Test@123');
    console.log('  - jane@test.com / Test@123');
    console.log('  - ahmed@test.com / Test@123');
    console.log('  - maria@test.com / Test@123');
    console.log('═'.repeat(50));
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
