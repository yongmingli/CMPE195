const express = require('express');
const userModel = require('../models/collections');
const app = express();

app.get('/User', async (req, res) => {
    const Users = await userModel.find({});

    try {
        res.send(Users);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;