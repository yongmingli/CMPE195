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

// router.get('/new-service/:serviceType', auth.isAuthenticated, function(req, res, next) {
//   const serviceType = req.params.serviceType;

//   (async function() {
//     var account;
    
//     switch (serviceType) {
//       case 'cleaning':
//         // First check if the user already has the account
//         account = await Account.findOne({user_ID: req.user._id, type: 'cleaning'});
//         if (account !== null)
//           return null;
          
//           account = await Account.createCleaning(req.user._id);
//           break;
          
//       case 'moving':
//         // First check if the user already has the account
//         account = await Account.findOne({user_ID: req.user._id, type: 'moving'});
//         if (account !== null)
//           return null;
        
//         account = await Account.createMoving(req.user._id, 2000, null);
//         break;

//       default:
//         return null;
//         break;
//     }

//     return account;
//   })().then(account => {
//     if (account != null)
//       res.redirect(`../account/${account._id}`);

//     else
//       res.redirect(`../`);
//   }).catch(err => next(err));
// });


// router.post('/apply', auth.isAuthenticated, function(req, res, next) {  
//   const imgBack = (req.body['img-back'] !== undefined) ? req.body['img-back'] : '';
//   const imgFront = (req.body['img-front'] !== undefined) ? req.body['img-front'] : '';

//   (async () => {

//     if (imgBack.length === 0 || imgFront.length === 0)
//         return req.flash('error', 'Check images are required.');
        
//       if (imgBack === imgFront)
//         return req.flash('error', 'Check images provided cannot be the same.');

//     return ;

//   })().then(response => {
//     res.redirect('deposit');

//   }).catch(err => next(err));
// });
 
 /* Export Module */
 module.exports = router;