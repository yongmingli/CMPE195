 /* Dependencies */

var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Account = require('../models/account');

/* Routes */
// router.get('/:accountId', auth.isAuthenticated, auth.accountBelongsToUser, function(req, res, next) {
//   const accountId = req.params.accountId;
  
//   // Using a IIFE since it's cleaner than using a Promise chain & passing account to next in chain.
//   (async function() {
//     const account = await Account.getAccount(accountId);
//     // const transactions = await Transaction.getTransactions(accountId);
    
//     transactions.reverse(); //The new added code to reverse the transactions. 
//     res.render('customer.html', 
//     {error: req.flash('error')[0]}
//     // {account: account, transactions: transactions}
//     );  

//   })().catch((err) => {
//     next(err);
//   });
// });

//  var express = require('express');
//  var router = express.Router();
//  var passport = require('passport');
 
 /* Routes */
 router.get('/', auth.isAuthenticated, function(req, res) {
  var services = {
    cleaning: null,
    moving: null,
    error: req.flash('error')[0]
  }

  Account.find({user_ID: req.user._id}, function(err, accounts){
    if(err){
      console.log(err);
    }

    for(var i = 0; i < accounts.length; i++)
    {
      if(accounts[i].type == 'cleaning'){
        services.cleaning = accounts[i];
        console.log(services.cleaning); // For TESTING
      }
      else if(accounts[i].type == 'moving'){
        services.moving = accounts[i];
        console.log(services.moving); // For TESTING
      }
      else{
        console.log('No Account detacted!');
      }
    }
    res.render('customer.pug', services);
  })
});
 
 /* Export Module */
 module.exports = router;