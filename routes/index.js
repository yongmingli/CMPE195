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
router.use('/setting_business', require('./setting_business'));
router.use('/auth_business', require('./auth_business'));
router.use('/logout', require('./logout'));
router.use('/result', require('./result'));
router.use('/order', require('./order'));

/* Routes */
router.get('/', function(req, res, next) {
  var isAuthenticated = false;
  if (req.isAuthenticated())
    isAuthenticated = true;

  res.render('index', {isAuthenticated: isAuthenticated});
});

router.post('/', function(req, res, next){
  const type = req.body['type'];
  // const type = 'fuck';
  const city = req.body['city'];
  // const city = 'San Jose';
  console.log('type:', type); 
  console.log('city:', city);

  if (city == null) {
    req.flash('error', 'Error');
    return res.redirect('/');  
  }
  return res.redirect(`/result/${city}/${type}`);   
});

console.log('\nProject Start!!!\n');

/* Export Module */
module.exports = router;