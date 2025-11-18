
// ============================================
// FILE: config/youtube.js
// YouTube API Configuration
// ============================================

const { google } = require('googleapis');
const logger = require('./logger');

// OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

/**
 * Generate YouTube OAuth URL
 * @param {string} state - Random state for CSRF protection
 * @returns {string} - OAuth URL
 */
const getAuthUrl = (state) => {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: state,
    prompt: 'consent'
  });
};

/**
 * Get tokens from authorization code
 * @param {string} code - Authorization code from callback
 * @returns {object} - Tokens
 */
const getTokensFromCode = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    logger.error('Error getting tokens from code:', error);
    throw error;
  }
};

/**
 * Create YouTube service with user tokens
 * @param {string} accessToken - User's access token
 * @param {string} refreshToken - User's refresh token
 * @returns {object} - YouTube service instance
 */
const getYouTubeService = (accessToken, refreshToken) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  return google.youtube({
    version: 'v3',
    auth: oauth2Client
  });
};

/**
 * Create a live broadcast on YouTube
 * @param {object} youtube - YouTube service instance
 * @param {object} broadcastData - Broadcast configuration
 * @returns {object} - Broadcast details
 */
const createLiveBroadcast = async (youtube, broadcastData) => {
  try {
    const { title, description, scheduledStartTime } = broadcastData;

    // Create broadcast
    const broadcastResponse = await youtube.liveBroadcasts.insert({
      part: ['snippet', 'status', 'contentDetails'],
      requestBody: {
        snippet: {
          title,
          description,
          scheduledStartTime: scheduledStartTime.toISOString()
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        },
        contentDetails: {
          enableAutoStart: true,
          enableAutoStop: true
        }
      }
    });

    // Create stream
    const streamResponse = await youtube.liveStreams.insert({
      part: ['snippet', 'cdn'],
      requestBody: {
        snippet: {
          title: `Stream for ${title}`
        },
        cdn: {
          frameRate: '30fps',
          ingestionType: 'rtmp',
          resolution: '1080p'
        }
      }
    });

    // Bind broadcast to stream
    await youtube.liveBroadcasts.bind({
      part: ['id'],
      id: broadcastResponse.data.id,
      streamId: streamResponse.data.id
    });

    return {
      broadcastId: broadcastResponse.data.id,
      streamKey: streamResponse.data.cdn.ingestionInfo.streamName,
      streamUrl: streamResponse.data.cdn.ingestionInfo.ingestionAddress,
      embedUrl: `https://www.youtube.com/embed/${broadcastResponse.data.id}`,
      watchUrl: `https://www.youtube.com/watch?v=${broadcastResponse.data.id}`
    };

  } catch (error) {
    logger.error('Error creating live broadcast:', error);
    throw error;
  }
};

module.exports = {
  getAuthUrl,
  getTokensFromCode,
  getYouTubeService,
  createLiveBroadcast,
  oauth2Client
};