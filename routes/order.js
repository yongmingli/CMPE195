var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var User = require('../models/user');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../middlewares/auth');
var Account = require('../models/account');
var User = require('../models/user');

var c_order_moving = require('../models/order_moving')
var c_order_cleaning = require('../models/order_cleaning')

router.get('/:business_type/:business_acconutid/:company_name', auth.isAuthenticated, function(req, res, next) {
  const order_type = req.params.business_type; 
  console.log('order type: ', order_type); // TESTING
  const order_businessid = req.params.business_acconutid;
  console.log('order bus id: ', order_businessid); // TESTING
  const order_company = req.params.company_name;
  console.log('order company: ', order_company); // TESTING

  const order = null; 
  const userid = req.user._id; 
  console.log('user id find: ', userid);
  
  (async function() {
    if (order_type == 'cleaning'){
      console.log('order type checked! creating order now!'); // TESTING
      order = await c_order_cleaning.createCleaningOrder(userid, order_businessid,'CMPE195', order_type, order_company, null);
      console.log(order); // TESTING
    }
    else if (order_type == 'moving'){
      console.log('order type checked! creating order now!'); // TESTING
      order = await c_order_moving.createMovingOrder(userid, order_businessid, "CMPE195", order_type, order_company, null);
      console.log(order); // TESTING
    }
    else {
      console.log(order_type);
    }
    res.render('order.pug',{order:order}); 
  })().catch((err) => {
    next(err);
  });
});

 /* Export Module */
 module.exports = router;