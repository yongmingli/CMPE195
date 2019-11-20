/**
 * order model module.
 * @module order
 */

/* Dependencies */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Account = require('./account');
const ObjectID = require('mongodb').ObjectID;

const SALTROUNDS = 10;

/* Schema */
var order_Moving_Schema = mongoose.Schema({
    _id: String,
    user_ID: String,
    account_ID: String,
    ordername: String,
    ordertype: String,
    company: String,
    price: Number,
    company_Lowercase: String,
    ordername_Lowercase: String,
});
/**
 * change order name type price and etc(may add more later)
 * @function Edit order information
 * @param {string} new order name
 * @param {string} new order type
 * @param {string} new order price
 * @returns {Promise} Promise object that represents the response.
 */
/* Methods */
order_Moving_Schema.methods.Edit = async function(ordername, ordertype,price) {
    this.ordername = ordername;
    this.price = price;
    return this.save();
}

/* Statics */
/**
 * Creates a new order in the DB.
 * @function createOrder
 * @param {string} order_name
 * @param {string} order_type
 * @param {string} order_company
 * @param {number} order_price
 * @returns {Promise} - Promise object that represents the response.
 */
order_Moving_Schema.statics.createMovingOrder = async function(user_ID, account_ID, order_name, order_type, order_company, order_price) {

    var responseObj = {
        success : null,
        message : null
    };
    // Create a new user
    var newOrder = this({
        _id: randomstring.generate({length: 24, charset: 'numeric'}),
        user_ID: user_ID,
        account_ID: account_ID,
        ordername: order_name,
        ordertype: order_type,
        company: order_company,
        price: order_price,
        company_Lowercase: order_company.toLocaleLowerCase(),
        ordername_Lowercase: order_name.toLocaleLowerCase(),
    });
    // const orderS = await newOrder.save();
    // const account = await Account.getAccount(account_ID);
    // if ((account.type !== 'Moving')){
    //     responseObj.success = false;
    //     responseObj.message = 'this account cannot create moving order';
    //     return responseObj;
    // }
    // var order = await this.find({company: newOrder.company_Lowercase},{ordername:newOrder.ordername_Lowercase},{order_type:newOrder.ordertype});
    //
    // if (order) {
    //     responseObj.success = false;
    //     responseObj.message = 'the order exist, you can edit it!';
    //     return responseObj;
    // }else {
    //     responseObj.success = true;
    //     responseObj.message = 'the order is created';
    //     await new order.save();
    // }
    responseObj.success = true;
    return await newOrder.save();
}
// /**
//  * Finds a order with a given order type.
//  * @function get_order_by_type
//  * @param {string} order_type
//  * @returns {order} - Found order object.
//  */
// orderSchema.statics.get_order_by_type_one = async function(order_type) {
//     return await this.findOne({ordertype: order_type});
// }
/**
 * Finds multiple order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * @returns {order} - Found order object.
 */
order_Moving_Schema.statics.get_order_by_type_many = async function(order_type) {
    return await this.find({ordertype: order_type});
}
/**
 * Finds one order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * * @param {string} order_name
 * @returns {order} - Found order object.
 */
order_Moving_Schema.statics.get_order_by_name_one = async function(order_type,order_name) {
    return await this.findone({ordertype: order_type}, {ordername_Lowercase: order_name.toLocaleLowerCase()});
}
/**
 * Finds one order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * * @param {string} order_name
 * @returns {order} - Found order object.
 */
order_Moving_Schema.statics.get_order_by_name_many = async function(order_type,order_name) {
    return await this.find({ordertype: order_type}, {ordername_Lowercase: order_name.toLocaleLowerCase()});
}

module.exports = mongoose.model('Order_Moving', order_Moving_Schema, 'Order_Moving');