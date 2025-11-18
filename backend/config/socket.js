// ============================================
// FILE: config/socket.js
// Socket.IO Configuration & Handlers
// ============================================

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('./logger');

// Store active connections
const activeConnections = new Map();

const initializeSocketIO = (io) => {
  
  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId).select('-passwordHash');
      
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      if (user.isSuspended) {
        return next(new Error('Authentication error: Account suspended'));
      }

      // Attach user to socket
      socket.user = user;
      
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id} (User: ${socket.user.username})`);
    
    // Store connection
    activeConnections.set(socket.id, {
      userId: socket.user._id.toString(),
      username: socket.user.username,
      connectedAt: new Date()
    });

    // ===== CHALLENGE ROOM MANAGEMENT =====
    
    // Join challenge room
    socket.on('join_challenge', async (data) => {
      try {
        const { challengeId } = data;
        
        // Join the room
        socket.join(`challenge:${challengeId}`);
        
        logger.info(`User ${socket.user.username} joined challenge ${challengeId}`);
        
        // Get current viewer count
        const room = io.sockets.adapter.rooms.get(`challenge:${challengeId}`);
        const viewerCount = room ? room.size : 0;
        
        // Notify all viewers in room
        io.to(`challenge:${challengeId}`).emit('viewer_joined', {
          viewerCount,
          user: {
            id: socket.user._id,
            username: socket.user.username
          }
        });
        
        // Send current challenge data to newly joined user
        socket.emit('challenge_data', {
          challengeId,
          viewerCount
        });
        
      } catch (error) {
        logger.error('Error joining challenge:', error);
        socket.emit('error', { message: 'Failed to join challenge' });
      }
    });

    // Leave challenge room
    socket.on('leave_challenge', async (data) => {
      try {
        const { challengeId } = data;
        
        socket.leave(`challenge:${challengeId}`);
        
        logger.info(`User ${socket.user.username} left challenge ${challengeId}`);
        
        // Get updated viewer count
        const room = io.sockets.adapter.rooms.get(`challenge:${challengeId}`);
        const viewerCount = room ? room.size : 0;
        
        // Notify remaining viewers
        io.to(`challenge:${challengeId}`).emit('viewer_left', {
          viewerCount,
          user: {
            id: socket.user._id,
            username: socket.user.username
          }
        });
        
      } catch (error) {
        logger.error('Error leaving challenge:', error);
      }
    });

    // ===== RATING EVENTS =====
    
    // Real-time rating update (triggered from API)
    // This is called by the API after saving rating to DB
    socket.on('rating_submitted', async (data) => {
      try {
        const { challengeId, aggregatedRatings } = data;
        
        // Broadcast rating update to all viewers in challenge room
        io.to(`challenge:${challengeId}`).emit('ratings_update', {
          challengeId,
          ratings: aggregatedRatings,
          timestamp: new Date()
        });
        
      } catch (error) {
        logger.error('Error broadcasting rating:', error);
      }
    });

    // ===== COMMENT EVENTS =====
    
    // New comment (triggered from API)
    socket.on('comment_posted', async (data) => {
      try {
        const { challengeId, comment } = data;
        
        // Broadcast comment to all viewers
        io.to(`challenge:${challengeId}`).emit('comment_added', {
          challengeId,
          comment,
          timestamp: new Date()
        });
        
      } catch (error) {
        logger.error('Error broadcasting comment:', error);
      }
    });

    // ===== ADVERTISEMENT EVENTS =====
    
    // Display advertisement
    socket.on('display_ad', async (data) => {
      try {
        const { challengeId, advertisement } = data;
        
        // Broadcast ad to all viewers
        io.to(`challenge:${challengeId}`).emit('ad_display', {
          challengeId,
          ad: advertisement,
          timestamp: new Date()
        });
        
      } catch (error) {
        logger.error('Error displaying ad:', error);
      }
    });

    // Advertisement rejected
    socket.on('ad_rejected', async (data) => {
      try {
        const { challengeId, adId, rejectedBy, reason } = data;
        
        // Broadcast rejection to all viewers
        io.to(`challenge:${challengeId}`).emit('ad_rejected', {
          challengeId,
          adId,
          rejectedBy,
          reason,
          timestamp: new Date()
        });
        
      } catch (error) {
        logger.error('Error broadcasting ad rejection:', error);
      }
    });

    // ===== CHALLENGE STATUS EVENTS =====
    
    // Challenge status changed
    socket.on('challenge_status_changed', async (data) => {
      try {
        const { challengeId, status, message } = data;
        
        // Broadcast status change to all viewers
        io.to(`challenge:${challengeId}`).emit('challenge_status_changed', {
          challengeId,
          status,
          message,
          timestamp: new Date()
        });
        
      } catch (error) {
        logger.error('Error broadcasting status change:', error);
      }
    });

    // ===== NOTIFICATION EVENTS =====
    
    // Send notification to specific user
    socket.on('send_notification', async (data) => {
      try {
        const { userId, notification } = data;
        
        // Find all sockets for this user
        const userSockets = Array.from(activeConnections.entries())
          .filter(([_, conn]) => conn.userId === userId.toString())
          .map(([socketId, _]) => socketId);
        
        // Send to all user's connected sockets
        userSockets.forEach(socketId => {
          io.to(socketId).emit('notification_received', notification);
        });
        
      } catch (error) {
        logger.error('Error sending notification:', error);
      }
    });

    // ===== DISCONNECT HANDLER =====
    
    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected: ${socket.id} (${reason})`);
      
      // Remove from active connections
      activeConnections.delete(socket.id);
      
      // Get all rooms this socket was in
      const rooms = Array.from(socket.rooms);
      
      // Update viewer count for challenge rooms
      rooms.forEach(room => {
        if (room.startsWith('challenge:')) {
          const challengeId = room.split(':')[1];
          const remainingRoom = io.sockets.adapter.rooms.get(room);
          const viewerCount = remainingRoom ? remainingRoom.size : 0;
          
          io.to(room).emit('viewer_left', {
            viewerCount,
            user: {
              id: socket.user._id,
              username: socket.user.username
            }
          });
        }
      });
    });

    // ===== ERROR HANDLER =====
    
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });

  // Periodic viewer count update (every 5 seconds)
  setInterval(() => {
    const challengeRooms = Array.from(io.sockets.adapter.rooms.entries())
      .filter(([room, _]) => room.startsWith('challenge:'));
    
    challengeRooms.forEach(([room, sockets]) => {
      const challengeId = room.split(':')[1];
      io.to(room).emit('viewer_count_update', {
        challengeId,
        viewerCount: sockets.size,
        timestamp: new Date()
      });
    });
  }, 5000);

  logger.info('Socket.IO initialized successfully');
};

// Helper function to emit to specific user
const emitToUser = (io, userId, event, data) => {
  const userSockets = Array.from(activeConnections.entries())
    .filter(([_, conn]) => conn.userId === userId.toString())
    .map(([socketId, _]) => socketId);
  
  userSockets.forEach(socketId => {
    io.to(socketId).emit(event, data);
  });
};

// Helper function to get active connections count
const getActiveConnectionsCount = () => {
  return activeConnections.size;
};

module.exports = {
  initializeSocketIO,
  emitToUser,
  getActiveConnectionsCount,
  activeConnections
};

