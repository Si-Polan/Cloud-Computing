require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRoutes = require('./routes/products');
var authRoutes = require('./routes/auth');
var articlesRoutes = require('./routes/articles');
var violationsRoutes = require('./routes/violations');
var paymentRoutes = require('./routes/payment');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/violations', violationsRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;
