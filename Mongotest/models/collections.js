/**
 * user model module.
 * @module user
 */

/* Dependencies */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const SALTROUNDS = 10;

/* Schema */
const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    email: String,
    emailLower: String,
    password: String,
});


/**
 * Creates a new user in the DB.
 * @function createUser
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} SSN
 * @param {string} birthdate
 * @returns {Promise} - Promise object that represents the response.
 */
userSchema.statics.createUser = async function(firstName, lastName, email, password,username) {

    // Create a new user
    var newUser = this({
        first_name: firstName,
        last_name: lastName,
        user_name: username,
        email: email,
        emailLower: email.toLocaleLowerCase(),
        password: password,
    });

    const user = await this.findOne({emailLower: newUser.emailLower});

    if (user) {
        return false;
    }

}

/**
 * Finds a user with a given email.
 * @function getUser
 * @param {string} email
 * @returns {User} - Found user object.
 */
userSchema.statics.getUser = async function(email) {
    return await this.findOne({emailLower: email.toLocaleLowerCase()});
}

/* Export Module as a Mongoose Model*/
module.exports = mongoose.model('User', userSchema, 'User');
