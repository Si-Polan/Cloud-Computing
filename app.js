const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const multerMiddleware = require('./src/middleware/multerMiddleware');

const authRoutes = require('./src/routes/auth');
const articlesRoutes = require('./src/routes/articles');
const violationsRoutes = require('./src/routes/violations');
const paymentRoutes = require('./src/routes/payment');
const helpRoutes = require('./src/routes/help');
const uploadRoutes = require('./src/routes/upload');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use multerMiddleware before the routes that handle file uploads
app.use(multerMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/violations', violationsRoutes);
app.use('/payment', paymentRoutes);
app.use('/help', helpRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;
