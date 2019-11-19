/* Dependencies */
 var express = require('express');
 var router = express.Router();
 var auth = require('../middlewares/auth');
 var Account = require('../models/account');
 
 /* Routes */
 router.get('/', auth.isAuthenticated, function(req, res) {
  Account.find({user_ID: req.user._id}, function(err, accounts){
    if(err){
      console.log(err);
    }
    res.render('auth_business.pug', {error: req.flash('error')[0]});
  })
});

router.post('/', auth.isAuthenticated, function(req, res, next) {
  const serviceType = req.body['type'];
  const company_name = req.body['company_name'];
  const city = req.body['city'];
  const address = req.body['address'];
  var account;

  (async function() {
    var account;

    switch (serviceType) {
      case 'cleaning':
        // First check if the user already has the account
        account =  await Account.findOne({user_ID: req.user._id, type: 'cleaning'});
        if (account !== null){
          req.flash('error', 'You have already registerd cleaning service!');
          return null;
        }
        account = await Account.create_Cleaning (req.user._id, 'cleaning', company_name, address, city)
        break;
          
      case 'moving':
        // First check if the user already has the account
        account = await Account.findOne({user_ID: req.user._id, type: 'moving'});
        if (account !== null){
          req.flash('error', 'You have already registerd moving service!');
          return null;
        }
        account = await Account.create_Moving(req.user._id, 'moving', company_name, address, city);
        break;

      default:
        return;
        break;
    }
    return account;
  })().then(account => {
    if (account != null)
      res.redirect(`/bueiness/${account._id}`);
    else
      res.redirect('/auth_business');
  }).catch(err => next(err));
});

 /* Export Module */
 module.exports = router;