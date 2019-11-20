/* Export Module */
 module.exports = router;

var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Account = require('../models/account');

/* Routes */
router.get('/:accountId', auth.isAuthenticated, auth.accountBelongsToUser, function(req, res, next) {
  const accountId = req.params.accountId;
  console.log(accountId); // For TESTING
  
  // Using a IIFE since it's cleaner than using a Promise chain & passing account to next in chain.
  (async function() {
    const account = await Account.getAccount(accountId);
    console.log(account); // For TESTING
    res.render('business_x.pug', account);  
  })().catch((err) => {
    next(err);
  });
});

// router.get('/', function(req, res, next) {
//   res.render('business.pug');  
// });

/* Export Module */
module.exports = router;