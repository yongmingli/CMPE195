 /* Dependencies */
 var express = require('express');
 var router = express.Router();
 var passport = require('passport');
 
 /* Routes */
 router.get('/', function(req, res, next) {
   res.render('customer.html', {error: req.flash('error')[0]});
 });
 
 router.post('/', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/customer',
   failureFlash: true
 }));
 
 /* Export Module */
 module.exports = router;