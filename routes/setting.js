/**
 * Settings route that defines settings logic.
 * @module settings
 **/

/* Dependencies */
var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var User = require('../models/user');
var Account = require('../models/account');

/* Routes */
router.get('/', auth.isAuthenticated, function(req, res) {
  Account.find({user_ID: req.user._id}, function(err, accounts){
    if(err){
      console.log(err);
    }
    res.render('setting.pug', {error: req.flash('error')[0]});
  })
});

router.post('/change-password', auth.isAuthenticated, function(req, res, next) {
  const oldPass = req['body']['old-password'];
  const newPass = req['body']['new-password'];
  const confirmNewPass = req['body']['confirm-new-password'];

  if (oldPass == null & newPass == null){
    req.flash('error', 'A field is empty. ');
    return res.redirect('/setting');
  }

  // if(isEmpty(oldPass, newPass) == true){
  //   req.flash('error', 'A field is empty. ');
  //   return res.redirect('/setting');
  // }
  if (oldPass == newPass){
    req.flash('error', 'Old password and new password is the same. ');
    return res.redirect('/setting');
  }

  // if(samePass(oldPass, newPass) == true){
  //   req.flash('error', 'Old password and new password is the same. ');
  //   return res.redirect('/setting');
  // }
  if(newPass == confirmNewPass){
    req.user.changePassword(oldPass, newPass)
    .then((response)=>{
      if(response == false){
        req.flash('error', 'Password does not match your current password. ');
        return res.redirect('/setting');
      }
      else{
        req.flash('error', 'Password changed! ');
        return res.redirect('/setting');
      }
    })
    .catch((err) => {
      next(err);
    })
  }
  else{
    req.flash('error', 'New password confirmation is wrong. ');
    return res.redirect('/settings');
  }
});

router.post('/change-address', auth.isAuthenticated, function(req, res, next) {
  const newAddress = req['body']['new-address'];
  const newCity = req['body']['new-city'];

  req.flash('error', 'NOT IMPLEMENT YET!');
  return res.redirect('/setting');
  
    // req.user.changeAddress(newAddress, newCity).then((response)=>{
    //   if(response == false){
    //     req.flash('error', 'Password does not match your current password. ');
    //     return res.redirect('/setting');
    //   }
    //   else{
    //     req.flash('error', 'Password changed! ');
    //     return res.redirect('/setting');
    //   }
    // })
    // .catch((err) => {
    //   next(err);
    // })
});

router.post('/close-user', auth.isAuthenticated, function(req, res, next){
  const password = req['body']['password'];

  (async function() {
    if(await req.user.authenticate(password) == false){
      req.flash('error', 'Inputed password does not match with the database. ');
      return res.redirect('/settings');
    }
    else {
      // Delete user and accompanying accounts
      await User.findByIdAndDelete(req.user._id).exec();
      return res.redirect('/');
    }
  })().then((res) => {
  }).catch((err) => {
    next(err);
  })
});
 
 /* Export Module */
 module.exports = router;