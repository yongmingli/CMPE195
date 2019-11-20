 var express = require('express');
 var router = express.Router();
 var passport = require('passport');
 var auth = require('../middlewares/auth');
 var Account = require('../models/account');
 var User = require('../models/user');

 var c_order_moving = require('../models/order_moving')
 var c_order_cleaning = require('../models/order_cleaning')

router.get('/:city/:type', function(req, res) {
    var accountObj = {
    type: null,
    city: null,
  }
  var isAuthenticated = false;
  if (req.isAuthenticated())
    isAuthenticated = true;

  const search_city = req.params.city;
  const search_type = req.params.type;

  // console.log('search type:', search_type); 
  console.log('search city:', search_city);
  console.log('search type:', search_type);
  // const results = Account.get_Accounts_By_City(search_city);
  // res.render('searchResult.html',results);  

  (async function() {
  const results = await Account.get_Accounts_By_City(search_city);
  console.log(results); // TESTING
    res.render('result.pug',{results:results, isAuthenticated: isAuthenticated});  

  })().catch((err) => {
    next(err);
  });
});

router.post('/order/:business_type/:business_acconutid/:result.company', function(req, res) {  
  const order_type = req.business_type; 
  const order_businessid = req.params.business_acconutid;
  const order_company = req.params.result.company;

  var sendError = {
    error: req.flash('error')[0]
  }

  (async function() {
    if (order_type == 'cleaning'){
      const date = new Date();
      const order = await c_order_cleaning.createCleaningOrder(req.user._id, order_businessid,Data.now(), order_type, order_company, null)
      console.log(order); // TESTING
      return res.redirect('/customer');
    }
    else if (order_type == 'moving'){
      const order = await c_order_moving.createMovingOrder(req.user._id, order_businessid, Data.now(), order_type, order_company, null)
      console.log(order); // TESTING
      return res.redirect('/customer');
    }
    else {
      console.log(order_type);
      req.flash('error', 'Order fails...Please check again later!');
      return res.redirect('/', sendError);
    }
  })().then((res) => {
  })().catch((err) => {
    next(err);
  });
});




// router.post('/search', function(req, res) {  

//   (async function() {
//   const results = await Account.get_Accounts_By_City(search_city);
//   console.log(results);
//     res.render('searchResult.pug',{results:results});  

//   })().catch((err) => {
//     next(err);
//   });
// });

 /* Export Module */
 module.exports = router;