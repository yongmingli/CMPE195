const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        "Username": String,
        "Password": true,
        "Email": true,
        "Address": true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;