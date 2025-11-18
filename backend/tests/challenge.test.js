// ============================================
// FILE: tests/challenge.test.js
// Challenge Tests - Complete Test Suite
// ============================================

const request = require('supertest');
const { app } = require('../server');
const { User, Challenge, ChallengeInvitation } = require('../models');

describe('Challenge Endpoints', () => {
  let token;
  let userId;
  let token2;
  let userId2;

  // Setup: Create two test users before all tests
  beforeAll(async () => {
    // User 1 (Creator)
    const response1 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'creator_user',
        email: 'creator@example.com',
        password: 'Test@1234',
        language: 'en',
        country: 'US'
      });
    
    token = response1.body.data.token;
    userId = response1.body.data.user.id;

    // User 2 (Opponent)
    const response2 = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'opponent_user',
        email: 'opponent@example.com',
        password: 'Test@1234',
        language: 'en',
        country: 'US'
      });
    
    token2 = response2.body.data.token;
    userId2 = response2.body.data.user.id;

    // Link YouTube for both users (mock)
    await User.findByIdAndUpdate(userId, {
      youtubeLinked: true,
      youtubeChannelId: 'channel_1'
    });

    await User.findByIdAndUpdate(userId2, {
      youtubeLinked: true,
      youtubeChannelId: 'channel_2'
    });
  });

  // ============================================
  // CREATE CHALLENGE TESTS
  // ============================================
  describe('POST /api/v1/challenges', () => {
    it('should create a new challenge successfully', async () => {
      const challengeData = {
        title: 'Climate Change Debate',
        description: 'A comprehensive debate on climate science',
        category: 'dialogue',
        field: 'Environmental Issues',
        rules: {
          duration: 60,
          rounds: 3,
          roundDuration: 15,
          customRules: 'Cite scientific sources'
        },
        language: 'en',
        country: 'US'
      };

      const response = await request(app)
        .post('/api/v1/challenges')
        .set('Cookie', `token=${token}`)
        .send(challengeData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenge.title).toBe(challengeData.title);
      expect(response.body.data.challenge.category).toBe(challengeData.category);
      expect(response.body.data.challenge.status).toBe('pending');
      expect(response.body.data.challenge.creator).toBeDefined();
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/challenges')
        .send({
          title: 'Test Challenge',
          category: 'dialogue',
          field: 'Test'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid category', async () => {
      const response = await request(app)
        .post('/api/v1/challenges')
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Test Challenge',
          category: 'invalid_category',
          field: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with short title', async () => {
      const response = await request(app)
        .post('/api/v1/challenges')
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Test',
          category: 'dialogue',
          field: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should create scheduled challenge', async () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      const response = await request(app)
        .post('/api/v1/challenges')
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Future Scheduled Debate',
          category: 'science',
          field: 'Physics',
          scheduledTime: futureDate.toISOString()
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenge.status).toBe('scheduled');
    });

    it('should fail with past scheduled time', async () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const response = await request(app)
        .post('/api/v1/challenges')
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Past Challenge',
          category: 'dialogue',
          field: 'Test',
          scheduledTime: pastDate.toISOString()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // LIST CHALLENGES TESTS
  // ============================================
  describe('GET /api/v1/challenges', () => {
    beforeEach(async () => {
      // Create multiple challenges
      await Challenge.create([
        {
          title: 'Challenge 1',
          category: 'dialogue',
          field: 'Politics',
          creator: userId,
          status: 'pending',
          language: 'en',
          country: 'US'
        },
        {
          title: 'Challenge 2',
          category: 'science',
          field: 'Physics',
          creator: userId,
          status: 'completed',
          language: 'en',
          country: 'US'
        },
        {
          title: 'Challenge 3',
          category: 'talent',
          field: 'Singing',
          creator: userId2,
          status: 'live',
          language: 'ar',
          country: 'EG'
        }
      ]);
    });

    it('should list all challenges', async () => {
      const response = await request(app)
        .get('/api/v1/challenges')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenges.length).toBeGreaterThan(0);
      expect(response.body.data.pagination).toBeDefined();
    });

    it('should filter by category', async () => {
      const response = await request(app)
        .get('/api/v1/challenges?category=dialogue')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.challenges.forEach(challenge => {
        expect(challenge.category).toBe('dialogue');
      });
    });

    it('should filter by status', async () => {
      const response = await request(app)
        .get('/api/v1/challenges?status=live')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.challenges.forEach(challenge => {
        expect(challenge.status).toBe('live');
      });
    });

    it('should filter by language', async () => {
      const response = await request(app)
        .get('/api/v1/challenges?language=ar')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.challenges.forEach(challenge => {
        expect(challenge.language).toBe('ar');
      });
    });

    it('should paginate results', async () => {
      const response = await request(app)
        .get('/api/v1/challenges?page=1&limit=2')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenges.length).toBeLessThanOrEqual(2);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(2);
    });

    it('should search challenges', async () => {
      const response = await request(app)
        .get('/api/v1/challenges?search=Challenge 1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenges.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // GET CHALLENGE DETAILS TESTS
  // ============================================
  describe('GET /api/v1/challenges/:id', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Test Challenge Details',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        status: 'pending',
        language: 'en',
        country: 'US'
      });
      challengeId = challenge._id;
    });

    it('should get challenge details', async () => {
      const response = await request(app)
        .get(`/api/v1/challenges/${challengeId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenge._id).toBe(challengeId.toString());
      expect(response.body.data.challenge.title).toBe('Test Challenge Details');
    });

    it('should fail with invalid ID', async () => {
      const response = await request(app)
        .get('/api/v1/challenges/invalid_id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail with non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/v1/challenges/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // UPDATE CHALLENGE TESTS
  // ============================================
  describe('PUT /api/v1/challenges/:id', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Original Title',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        status: 'pending',
        language: 'en',
        country: 'US'
      });
      challengeId = challenge._id;
    });

    it('should update challenge successfully', async () => {
      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Updated Title',
          description: 'New description'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenge.title).toBe('Updated Title');
      expect(response.body.data.challenge.description).toBe('New description');
    });

    it('should fail if not creator', async () => {
      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token2}`)
        .send({
          title: 'Hacked Title'
        })
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should fail for live challenge', async () => {
      await Challenge.findByIdAndUpdate(challengeId, { status: 'live' });

      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token}`)
        .send({
          title: 'Updated Title'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // JOIN CHALLENGE TESTS
  // ============================================
  describe('POST /api/v1/challenges/:id/join', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Open Challenge',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        status: 'pending',
        language: 'en',
        country: 'US'
      });
      challengeId = challenge._id;
    });

    it('should send join request successfully', async () => {
      const response = await request(app)
        .post(`/api/v1/challenges/${challengeId}/join`)
        .set('Cookie', `token=${token2}`)
        .send({
          message: 'I would love to participate!'
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.invitation).toBeDefined();
    });

    it('should fail if creator tries to join own challenge', async () => {
      const response = await request(app)
        .post(`/api/v1/challenges/${challengeId}/join`)
        .set('Cookie', `token=${token}`)
        .send({
          message: 'Joining my own challenge'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should fail for duplicate join request', async () => {
      // First request
      await request(app)
        .post(`/api/v1/challenges/${challengeId}/join`)
        .set('Cookie', `token=${token2}`)
        .send({
          message: 'First request'
        });

      // Duplicate request
      const response = await request(app)
        .post(`/api/v1/challenges/${challengeId}/join`)
        .set('Cookie', `token=${token2}`)
        .send({
          message: 'Duplicate request'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // ACCEPT/REJECT JOIN REQUEST TESTS
  // ============================================
  describe('PUT /api/v1/challenges/:id/accept/:userId', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Challenge with Request',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        status: 'pending',
        language: 'en',
        country: 'US'
      });
      challengeId = challenge._id;

      // Create join request
      await ChallengeInvitation.create({
        challenge: challengeId,
        inviter: userId2,
        invitee: userId,
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    });

    it('should accept join request', async () => {
      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}/accept/${userId2}`)
        .set('Cookie', `token=${token}`)
        .send({
          action: 'accept',
          message: 'Welcome!'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.challenge.opponent).toBeDefined();
    });

    it('should reject join request', async () => {
      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}/accept/${userId2}`)
        .set('Cookie', `token=${token}`)
        .send({
          action: 'reject',
          message: 'Sorry, not this time'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('rejected');
    });

    it('should fail if not creator', async () => {
      const response = await request(app)
        .put(`/api/v1/challenges/${challengeId}/accept/${userId2}`)
        .set('Cookie', `token=${token2}`)
        .send({
          action: 'accept'
        })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // CANCEL CHALLENGE TESTS
  // ============================================
  describe('DELETE /api/v1/challenges/:id', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Challenge to Cancel',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        status: 'pending',
        language: 'en',
        country: 'US'
      });
      challengeId = challenge._id;
    });

    it('should cancel challenge successfully', async () => {
      const response = await request(app)
        .delete(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      
      const challenge = await Challenge.findById(challengeId);
      expect(challenge.status).toBe('cancelled');
    });

    it('should fail if not creator', async () => {
      const response = await request(app)
        .delete(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token2}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should fail for completed challenge', async () => {
      await Challenge.findByIdAndUpdate(challengeId, { status: 'completed' });

      const response = await request(app)
        .delete(`/api/v1/challenges/${challengeId}`)
        .set('Cookie', `token=${token}`)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // GET RATINGS TESTS
  // ============================================
  describe('GET /api/v1/challenges/:id/ratings', () => {
    let challengeId;

    beforeEach(async () => {
      const challenge = await Challenge.create({
        title: 'Challenge with Ratings',
        category: 'dialogue',
        field: 'Test',
        creator: userId,
        opponent: userId2,
        status: 'live',
        language: 'en',
        country: 'US',
        creatorRatingSum: 420,
        creatorRatingCount: 100,
        opponentRatingSum: 480,
        opponentRatingCount: 100
      });
      challengeId = challenge._id;
    });

    it('should get challenge ratings', async () => {
      const response = await request(app)
        .get(`/api/v1/challenges/${challengeId}/ratings`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.ratings).toBeDefined();
      expect(response.body.data.ratings.creator).toBeDefined();
      expect(response.body.data.ratings.opponent).toBeDefined();
      expect(response.body.data.ratings.totalRatings).toBeGreaterThan(0);
    });
  });
});
