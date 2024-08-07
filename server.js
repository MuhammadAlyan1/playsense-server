const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const feedbackRouter = require('./routes/feedback');
const profileRouter = require('./routes/profile');
const serviceRouter = require('./routes/service');
const orderRouter = require('./routes/order');
const notificationRouter = require('./routes/notification');
const matchAnalyticsRouter = require('./routes/matchAnalytics');
const jwtRouter = require('./routes/jwt');
const paypalRouter = require('./routes/paypal');
const reportRouter = require('./routes/report');
const gameDatabaseRouter = require('./routes/gameDatabase.js');
const connectDB = require('./db/connection.js');
const cron = require('node-cron');
const updatedOrderStatus = require('./controllers/cron/UpdateOrderStatus');
connectDB();
const { Server } = require('socket.io');
const http = require('http');
const Message = require('./db/model/message.js');
const Conversation = require('./db/model/conversation.js');
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/profile', profileRouter);
app.use('/api/match-analytics', matchAnalyticsRouter);
app.use('/api/service', serviceRouter);
app.use('/api/jwt', jwtRouter);
app.use('/api/order', orderRouter);
app.use('/api/paypal', paypalRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/report', reportRouter);
app.use('/api/game-database', gameDatabaseRouter);

mongoose.connection.once('open', () => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log('We are live and connected');

    socket.on('getConversations', async (data) => {
      if (!data.connectedUserId) return;
      const conversations = await Conversation.find({
        profiles: { $in: [new mongoose.Types.ObjectId(data.connectedUserId)] }
      })
        .populate('profiles')
        .populate('messages');
      io.emit('getConversations', {
        conversations
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('sendMessage', async (data) => {
      if (!data?.senderId || !data?.receiverId || !data?.contents?.trim()) {
        console.log('Please enter senderId, receiverId, and contents.');
        return;
      }
      const newMessage = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        contents: data.contents
      });

      const profiles =
        data.senderId > data.receiverId
          ? [data.senderId, data.receiverId]
          : [data.receiverId, data.senderId];
      const conversationId = profiles.join('-');

      const updatedConversation = await Conversation.findOneAndUpdate(
        { conversationId },
        {
          profiles,
          conversationId,
          $push: { messages: newMessage._id }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
        .populate('profiles')
        .populate('messages');
      io.emit('sendMessage', updatedConversation);
    });
  });

  server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);

    cron.schedule('0 0 * * *', () => {
      updatedOrderStatus();
    });
  });
});
