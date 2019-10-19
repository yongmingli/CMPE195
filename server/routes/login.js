/**
 * Login route that defines log in logic.
 * @module login
 */

 /* Dependencies */
 var express = require('express');
 var router = express.Router();
//  var passport = require('passport');
 
 /* Routes */
 router.get('/', function(req, res, next) {
   res.render('src/components/login/index', {error: req.flash('error')[0]});
 });
 
//  router.post('/', passport.authenticate('local', {
//    successRedirect: '/app',
//    failureRedirect: '/sign-in',
//    failureFlash: true
//  }));
 
 /* Export Module */
 module.exports = router;