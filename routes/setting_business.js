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
    // if(err){
    //   console.log(err);
    // }
    (async function() {
        const account = await Account.getAccount(accountId);
        res.render('setting_business.pug', {account: account});  
    
      })().catch((err) => {
        next(err);
      });
    // res.render('setting_business.pug', {error: req.flash('error')[0]});
  })
});

router.post('close-account', auth.isAuthenticated, function(req, res, next){
    const closeAcc = req['body']['account-id'];
    (async function() {
      var acc = await Account.getAccount(closeAcc);
      await Account.close(acc._id);
      return res.redirect('/customer');
    })().then((res) => {
  
    }).catch((err) => {
      next(err);
    })
  });
 
 /* Export Module */
 module.exports = router;