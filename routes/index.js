/**
 * Main route that loads other routes.
 * @module index
 */

/* Dependencies */
var express = require('express');
var router = express.Router();
var passport = require('passport');
//var initPassport = require('../config/passport_config').initPassport;

/* Initialize Passport */
//initPassport();

/* Load other routes */
router.use('/signup', require('./signup.js'));
router.use('/login', require('./login.js'));
router.use('/logout', require('./logout.js'));

/* Routes */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Spartan Financial Group (SFG) Banking' });
});

/* Export Module */
module.exports = router;