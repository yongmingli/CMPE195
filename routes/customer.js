 /* Dependencies */

var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Account = require('../models/account');
var c_order = require('../models/order_User');
 
 /* Routes */
 router.get('/', auth.isAuthenticated, function(req, res) {
  var services = {
    cleaning: null,
    moving: null,
    error: req.flash('error')[0]
  }
  var my_orders = null;
  const userid = req.user._id;  

  Account.find({user_ID: req.user._id}, function(err, accounts){
    if(err){
      console.log(err);
    }
    for(var i = 0; i < accounts.length; i++)
    {
      if(accounts[i].type == 'cleaning'){
        services.cleaning = accounts[i];
        console.log('Cleaning Found!!!'); // For TESTING
        console.log(services.cleaning); // For TESTING
      }
      else if(accounts[i].type == 'moving'){
        services.moving = accounts[i];
        console.log('Moving Found!!!'); // For TESTING
        console.log(services.moving); // For TESTING
      }
      else{
        console.log('No Account detacted!');
      }
    }
    // my_orders = c_order.get_order_by_id(userid); 
    // console.log('My order is: ', my_orders); // For TESTING
    // const size = my_orders.length; 
    // console.log('My order size is: ', size); // For TESTING
    // res.render('customer.pug', {services:services,my_orders:my_orders});
    res.render('customer.pug', services);
    
    // (async function() {
    //   my_orders = c_order.get_order_by_id(userid); 
    //   console.log('My order is: ', my_orders); // For TESTING
    //   const size = my_orders.length; 
    //   console.log('My order size is: ', size); // For TESTING
    //   res.render('customer.pug', {services:services, my_orders:my_orders}); 
    // })().catch((err) => {
    //   next(err);
    // });

  })
});
 
 /* Export Module */
 module.exports = router;