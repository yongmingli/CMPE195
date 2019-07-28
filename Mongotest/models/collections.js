const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Username: String,
    Phone: Number,
    Address: String,
    Email: String,
    Password: String,
});

module.exports = mongoose.model("UserReg", UserSchema);