/**
 * Main route that loads other routes.
 */

/* Dependencies */
var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var initPassport = require('../config/passport_config').initPassport;

/* Initialize Passport */
// initPassport();

/* Load other routes */
router.use('/login', require('./routes/login.js'));
router.use('/signup', require('./routes/signup.js'));
router.use('/admin', require('./routes/admin.js'));

/* Routes */
router.get('/', function(req, res, next) {
  res.render('src/app.js', { title: 'Project' });
});

/* Export Module */
module.exports = router;