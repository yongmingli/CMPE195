const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        "Username": String,
        "Password": true,
        "Email": true,
        "Address": true
    }
});

const Collections = mongoose.model("Collections", UserSchema);
module.exports = Collections;