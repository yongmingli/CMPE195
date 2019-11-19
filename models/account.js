/**
 * account model module.
 * @module account
 */

/* Dependencies */
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const randomstring = require('randomstring');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user');

/* Constants */
const MAX_RETRIES = 5;


/* Schema */
var accountSchema = mongoose.Schema({
    _id: String,
    user_ID: String,
    type: String,
    company_name: String,
    address: String,
    city: String,
    check_Bussiness : Boolean,
});

/* Plugins */
accountSchema.plugin(uniqueValidator);

/* Methods */




/* Statics */

/**
 * Creates a new account.
 * @function createAccount
 * @param {ObjectID} user_ID
 * @param {String} type
 * @param {String} balance
 * @param {Number} minimumDue
 * @param {Number} limit
 * @param {Number} paymentDate
 * @returns {Promise}
 */
accountSchema.statics.createAccount = async function(user_ID, type,  company_name, address, city, check_Bussiness) {
    var newAccount = this({
        _id: randomstring.generate({length: 12, charset: 'numeric'}),
        user_ID: user_ID,
        type: type,
        company_name: company_name,
        address: address,
        city: city,
        check_Bussiness : check_Bussiness,
    });

    return await newAccount.save();
}

/**
 * Creates a new Bussiness account.
 * @function createBussiness
 * @param {ObjectID} user_ID
 * @returns {Promise}
 */
// var accountSchema = mongoose.Schema({
//     _id: String,
//     user_ID: String,
//     type: String,
//     company_name: String,
//     address: String,
//     city: String,
//     check_Bussiness : Boolean,
// });
accountSchema.statics.create_Cleaning = async function(user_ID, type, company_name, address, city) {

    var promise = Promise.reject();
    for(var i = 0; i < MAX_RETRIES; i++)
        promise = promise.catch(() => {return this.createAccount(user_ID, type, company_name, address, city, true)});

    return await promise.then((res) => {return res}).catch((res) => {return Promise.reject(res)});
}

accountSchema.statics.create_Moving = async function(user_ID, type, company_name, address, city) {

    var promise = Promise.reject();
    for(var i = 0; i < MAX_RETRIES; i++)
        promise = promise.catch(() => {return this.createAccount(user_ID, type, company_name, address, city, true)});

    return await promise.then((res) => {return res}).catch((res) => {return Promise.reject(res)});
}
/**
 * Creates a new User account.
 * @function createUser
 * @param {ObjectID} user_ID
 * @returns {Promise}
 */
accountSchema.statics.create_User = async function(user_ID) {

    var promise = Promise.reject();
    for(var i = 0; i < MAX_RETRIES; i++)
        promise = promise.catch(() => {return this.createAccount(user_ID, 'User', null, null, null, null, true)});

    return await promise.then((res) => {return res}).catch((res) => {return Promise.reject(res)});
}
/**
 * Gets the account information of a specificed account ID.
 * @function getAccount
 * @param {string} account_ID - The ID of the requested account.
 * @returns {Promise} - Promise object that represents the response.
 */
accountSchema.statics.getAccount = async function(account_ID) {
    return await this.findOne({_id: account_ID});
}

/**
 * Gets all the accounts belonging to a user.
 * @function getAccounts
 * @param {string} user_ID - The user whose accounts will be retrieved.
 * @returns {Promise} - Promise object that represents the response.
 */
accountSchema.statics.getAccounts = async function(user_ID) {
    return await this.find({user_ID: user_ID});
}
accountSchema.statics.get_company_by_city = async function(city) {
    return await this.find({city: city});
}
/**
 * Checks whether an account belongs to a user.
 * @function belongsToUser
 * @param {string} account_ID - The ID of the account in question.
 * @param {string} user_ID - The user whose ownership of the account is in question.
 * @returns {boolean} - Denotes whether the account belongs to the user.
 */
accountSchema.statics.belongsToUser = async function(account_ID, user_ID) {
    if (await this.findOne({_id: account_ID, user_ID: user_ID}) == null)
        return false;

    return true;
}

/**
 * Closes an account given that it does not have a negative balance (for checkings) or balance (for credit).
 * @function close
 * @param ID
 */
accountSchema.statics.close = async function(ID) {
    var responseObj = {
        success: null,
        message: null
    };

    const account = await this.findById(ID);

    if ((account.type === 'User')) {
        this.findByIdAndRemove(account._id);
        responseObj.success = true;
        responseObj.message = 'User has been removed!/n';
        return responseObj;
    }
    if ((account.type === 'Bussiness')) {
        this.findByIdAndRemove(account._id);
        responseObj.success = true;
        responseObj.message = 'Bussiness account has been removed!/n';
        return responseObj;
    }

    await this.findByIdAndRemove(account._id);
    responseObj.success = true;
    return responseObj;
}

/* Export Module as a Mongoose Model*/
module.exports = mongoose.model('Account', accountSchema, 'Account');
