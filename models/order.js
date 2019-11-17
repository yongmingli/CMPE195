/**
 * order model module.
 * @module order
 */

/* Dependencies */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const SALTROUNDS = 10;

/* Schema */
var orderSchema = mongoose.Schema({
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
userSchema.methods.Edit = async function(ordername, ordertype,price) {

    this.ordername = ordername;
    this.ordertype = ordertype;
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
userSchema.statics.createOrder = async function(order_name, order_type, order_company, order_price) {

    // Create a new user
    var newOrder = this({
        ordername: order_name,
        ordertype: order_type,
        company: order_company,
        price: order_price,
        company_Lowercase: order_company.toLocaleLowerCase(),
        ordername_Lowercase: order_name.toLocaleLowerCase(),
    });

    var order = await this.find({company: newOrder.company_Lowercase},{ordername:newOrder.ordername_Lowercase},{order_type:newOrder.ordertype});

    if (order) {
        return false;
    }

    return await newOrder.save();
}
/**
 * Finds a order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * @returns {order} - Found order object.
 */
orderSchema.statics.get_order_by_type_one = async function(order_type) {
    return await this.findOne({ordertype: order_type});
}
/**
 * Finds multiple order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * @returns {order} - Found order object.
 */
orderSchema.statics.get_order_by_type_many = async function(order_type) {
    return await this.find({ordertype: order_type});
}
/**
 * Finds one order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * * @param {string} order_name
 * @returns {order} - Found order object.
 */
orderSchema.statics.get_order_by_name_one = async function(order_type,order_name) {
    return await this.findone({ordertype: order_type}, {ordername_Lowercase: order_name.toLocaleLowerCase()});
}
/**
 * Finds one order with a given order type.
 * @function get_order_by_type
 * @param {string} order_type
 * * @param {string} order_name
 * @returns {order} - Found order object.
 */
orderSchema.statics.get_order_by_name_many = async function(order_type,order_name) {
    return await this.find({ordertype: order_type}, {ordername_Lowercase: order_name.toLocaleLowerCase()});
}

module.exports = mongoose.model('Order', userSchema, 'Order');