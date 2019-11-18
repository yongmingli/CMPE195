var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./routes/index');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
var mongoose = require('mongoose');
var dbConstants = require('./config/db_config');
var engines = require('consolidate');
// const Billpay = require('./models/billpay');

const dbURI = `mongodb+srv://${dbConstants.DB_USER}:${dbConstants.DB_PASSWORD}@${dbConstants.DB_HOST}`;
mongoose.connect(dbURI);

// Schedule all bill pay on server startup
// Billpay.scheduleAllBillpay().then(res => {console.log('Scheduling all bill pay')}).catch(err => {console.log(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.swig); // take note, using 'html', not 'ejs' or 'pug'..
app.set('view engine', 'html'); // also 'html' here.

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'Project-Secret'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.pug');
});

module.exports = app;
