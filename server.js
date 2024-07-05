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
const matchAnalyticsRouter = require('./routes/matchAnalytics');
const jwtRouter = require('./routes/jwt');
const connectDB = require('./db/connection.js');

connectDB();

const corsOptions = {
  origin: 'http://localhost:5173',
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
mongoose.connection.once('open', () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);
  });
});
