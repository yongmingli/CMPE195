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
router.get('/:accountId', auth.isAuthenticated, auth.accountBelongsToUser, function(req, res, next) {
  const accountId = req.params.accountId;
  console.log(accountId); // For TESTING
  
  // Using a IIFE since it's cleaner than using a Promise chain & passing account to next in chain.
  (async function() {
    const account = await Account.getAccount(accountId);
    console.log(account); // For TESTING
    res.render('setting_business.pug', {account:account,accountId});  
  })().catch((err) => {
    next(err);
  });
});

router.post(':accountId/change-address', auth.isAuthenticated, function(req, res, next){
  const new_address = req.body['new_address'];
  const new_city = req.body['new_city'];

  (async function() {
    // var acc = await Account.getAccount(closeAcc);
    // await Account.close(acc._id);
    return res.redirect(`/setting_business/${req.account._id}`);
  })().then((res) => {
  }).catch((err) => {
    next(err);
  })
});

router.post(':accountId:/close-account', auth.isAuthenticated, function(req, res, next){
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