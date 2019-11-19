/* Export Module */
 module.exports = router;

var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Account = require('../models/account');

/* Routes */
router.get('/:accountId', function(req, res, next) {
  const accountId = req.params.accountId;
  
  // Using a IIFE since it's cleaner than using a Promise chain & passing account to next in chain.
    const account = Account.getAccount(accountId);
    res.render('business.html', {account: account});
});
/* Export Module */
module.exports = router;