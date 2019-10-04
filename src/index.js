// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var passport = require('passport');
// var indexRouter = require('../routes/index');
// var session = require('express-session');
// var flash = require('connect-flash');

// // var app = express();
// var mongoose = require('mongoose');
// var dbConstants = require('../config/db_config');
// //const Billpay = require('./models/billpay');

// const dbURI = `mongodb+srv://${dbConstants.DB_USER}:${dbConstants.DB_PASSWORD}@${dbConstants.DB_HOST}/${dbConstants.DB_NAME}`;
// mongoose.connect(dbURI);
// const dbURIaActual = process.env.MONGODB_URI;

// // Schedule all bill pay on server startup
// //Billpay.scheduleAllBillpay().then(res => {console.log('Scheduling all bill pay')}).catch(err => {console.log(err)});

// // view engine setup
// //app.set('views', path.join(__dirname, 'views'));
// //app.set('view engine', 'html');

// // app.use(express.static(__dirname + '/views'));

// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(session({secret: 'project'}));
// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(passport.initialize());
// // app.use(passport.session());
// // app.use(flash());
// // app.use('/', indexRouter);

// // // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //     next(createError(404));
// // });

// // // error handler
// // app.use(function(err, req, res, next) {
// //     // set locals, only providing error in development
// //     res.locals.message = err.message;
// //     res.locals.error = req.app.get('env') === 'development' ? err : {};

// //     // render the error page
// //     res.status(err.status || 500);
// //     res.render('error');
// // });

// module.exports = app;

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();