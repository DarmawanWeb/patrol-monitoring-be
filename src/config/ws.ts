import http from 'http';
import logger from './logger';
import { Server } from 'socket.io';
import { env } from 'process';

const socketServer = http.createServer();
const io = new Server(socketServer, {
  cors: {
    origin: env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (room: string) => {
    logger.debug(`Socket ${socket.id} joined room: ${room}`);
    socket.join(room);
  });

  socket.on('robot:data', (robotData) => {
    socket.broadcast.emit('robot:data', robotData);
  });

  socket.on('error', (error: Error) => {
    logger.error(`Socket error: ${error.message}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket ${socket.id} disconnected`);
  });
});

export default socketServer;
