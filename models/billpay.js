/**
 * billpay model module.
 * @module billpay
 */

/* Dependencies */
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const Account = require('./account');
const Transaction = require('./transaction');

/* Schema */
var billpaySchema = mongoose.Schema({
  user_ID: String,
  account_ID: String,
  bill_number: String,
  balance: Number,
  note: String,
  payment_timestamp: Number,
  is_recurring: Boolean,
  creation_timestamp: Number
});

/* Methods */

/* Statics */

/**
 * Creates a new billpay in the DB.
 * @function createBillpay
 * @param {string} user_ID - The user which the billpay belongs to.
 * @param {string} account_ID - The user's account which the billpay belongs to.
 * @param {string} billNumber
 * @param {number} balance
 * @param {string} note
 * @param {Number} paymentTimestamp
 * @param {Boolean} isRecurring
 * @returns {Promise} - Promise object that represents the response.
 */
billpaySchema.statics.createBillpay = async function(user_ID, account_ID, billNumber, balance, note, paymentTimestamp, isRecurring) {

  var responseObj = {
    success : null,
    message : null
  };

  // Create new billpay object based on schema and parameters
  var newBillpay = this({
    user_ID: user_ID,
    account_ID: account_ID,
    bill_number: billNumber,
    balance: balance,
    note: note,
    payment_timestamp: paymentTimestamp,
    is_recurring: isRecurring,
    creation_timestamp: Date.now()
  });

  // Save the billpay object
  const billpay = await newBillpay.save();

  // Ignore scheduling any recurring billpay
  if (newBillpay.is_recurring) {
    responseObj.success = false;
    responseObj.message = 'Cannot schedule recurring billpay';
    return responseObj;
  }
  
  const account = await Account.getAccount(account_ID);
  
  // Do not allow balances greater than available
  if ((account.type !== 'credit') && account.balance < balance) {
    responseObj.success = false;
    responseObj.message = 'Not enough balance to pay bill.';
    return responseObj;  

  } else if ((account.type === 'credit') ) {
    
  }
  

  // Schedule the billpay
  scheduleBillpay.call(this, billpay, new Date(billpay.payment_timestamp));

  responseObj.success = true;
  return responseObj;
}

/**
 * Retrieves an array of all the billpay that belongs to a user.
 * @function getAllBillpay
 * @param {string} user_ID - The user which the billpay belongs to.
 * @returns {Promise} - Promise object that represents the response.
 */
billpaySchema.statics.getAllBillpay = async function(user_ID) {

  // Return all billpay documents belonging to the user
  return await this.find({user_ID: user_ID});
}

/**
 * Schedules all the billpay from the DB.
 * @function scheduleAllBillpay
 * @returns {Promise}
 */
billpaySchema.statics.scheduleAllBillpay = async function() {
  // const billpays = await this.find();

  var billpays = new Array();
  billpays.push(await this.findOne());

  for (billpay of billpays) {
    
    // For now ignore recurring billpay
    if (billpay.is_recurring)
      continue;

    scheduleBillpay.call(this, billpay, new Date(billpay.payment_timestamp));
  }

  return true;
}

/* Utilities */

/**
 * Utility function that schedules billpay. Must apply the caller's `this` to the function
 * @function scheduleBillpay
 * @param {Object} billpay - Bill to process.
 * @param {Date} paymentDate - Date for payment.
 */
function scheduleBillpay(billpay, paymentDate) {
  schedule.scheduleJob(paymentDate, () => {
    Account.getAccount(billpay.account_ID).then(account => {
      console.log(`Executing scheduled billpay:\n${billpay}`);
      
      // Add balance to credit account
      if (account.type === 'credit')
        return account.deposit(billpay.balance);
      
      // Deduct balance from other accounts
      else
        return account.deduct(billpay.balance);
      
    }).then((account) => {
      
      var balancePaid;

      // Balance paid for credit is a positive balance onto the account
      if (account.type === 'credit')
        balancePaid = billpay.balance;
      
      // Balance paid to all other accounts are a negative balance onto the account
      else
        balancePaid = billpay.balance * -1;
      
      // Create relevant transaction
      return Transaction.createTransaction(billpay.account_ID, `Bill No.: ${billpay.bill_number}`, 'Bill Payment', `Bill payment for bill number: ${billpay.bill_number}`, balancePaid, 'Processed')
      
    }).then(() => {
      // Delete billpay from DB
      return this.findByIdAndDelete(billpay._id);
      
    }).then().catch(err => {console.log(err)});
  });
}

/* Export Module as a Mongoose Model*/
module.exports = mongoose.model('Billpay', billpaySchema, 'Billpay');