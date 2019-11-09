/**
 * Main route that loads other routes.
 * @module index
 */

/* Dependencies */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var initPassport = require('../config/passport_config').initPassport;

/* Initialize Passport */
initPassport();

/* Load other routes */
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/customer', require('./customer'));
router.use('/business', require('./business'));
router.use('/setting', require('./setting'));
router.use('/auth_business', require('./auth_business'));
/* Routes */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'City Service Project' });
});

console.log('\nProject Start!!!\n');

/* Export Module */
module.exports = router;