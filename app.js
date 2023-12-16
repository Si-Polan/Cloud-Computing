const express = require('express');
const path = require('path'); // Tambahkan baris ini untuk mengimpor modul path
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRoutes = require('./src/routes/auth');
const articles = require('./src/routes/articles');
const articlesDetail = require('./src/routes/articleDetail');
const violationsRoutes = require('./src/routes/violations');
const paymentRoutes = require('./src/routes/payment');
const helpRoutes = require('./src/routes/help');
const multerMiddleware = require('./src/middleware/multerMiddleware'); // Import middleware multer

const app = express();

// Middleware untuk logging menggunakan morgan
app.use(logger('dev'));

// Middleware untuk parsing body dari request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan Multer Middleware di endpoint tertentu
app.use(multerMiddleware); // Gunakan middleware multer

// Gunakan Router untuk setiap bagian aplikasi
app.use('/auth', authRoutes);
app.use('/articles', articles);
app.use('/articles/detail', articlesDetail);
app.use('/violations', violationsRoutes);
app.use('/payment', paymentRoutes);
app.use('/help', helpRoutes);

module.exports = app;
