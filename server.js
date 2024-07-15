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
const connectDB = require('./db/connection.js');
const cron = require('node-cron');
const updatedOrderStatus = require('./controllers/cron/UpdateOrderStatus');

connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
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

mongoose.connection.once('open', () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);

    cron.schedule('0 0 * * *', () => {
      updatedOrderStatus();
    });
  });
});
