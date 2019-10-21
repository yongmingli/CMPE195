/**
 * Sign In route that defines sign in logic.
 * @module login
 */

 /* Dependencies */
 var express = require('express');
 var router = express.Router();
 var passport = require('passport');
 
 /* Routes */
 router.get('/', function(req, res, next) {
   res.render('login.html', {error: req.flash('error')[0]});
 });
 
 router.post('/', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true
 }));
 
 /* Export Module */
 module.exports = router;