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
// router.use('/sign-in', require('./sign-in'));
// router.use('/sign-up', require('./sign-up'));
// router.use('/sign-out', require('./sign-out'));
// router.use('/dashboard', require('./dashboard'));
// router.use('/dashboard/settings', require('./settings'));
// router.use('/dashboard/account', require('./account'));
// router.use('/find-atm', require('./find-atm'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/dashboard', require('./dashboard'));
router.use('/business', require('./business'));
/* Routes */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'City Service Project' });
});

console.log('\nProject Start!!!\n');

/* Export Module */
module.exports = router;