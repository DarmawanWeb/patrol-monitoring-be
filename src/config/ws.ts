import http from 'http';
import { Server } from 'socket.io';
import logger from './logger';
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
    console.log(`Socket ${socket.id} joined room: ${room}`);
    socket.join(room);
  });

  socket.on('robot:data', (robotData) => {
    logger.info(`Received robot data: ${JSON.stringify(robotData, null, 2)}`);
    socket.broadcast.emit('robot:data', robotData);
  });
  socket.on('error', (error: Error) => {
    logger.error(`Socket error: ${error.message}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket ${socket.id} disconnected`);
    console.log(`Socket ${socket.id} disconnected`);
  });
});

export default socketServer;
