// IMPORTING MODULES AND FILES
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');

// MIDDLEWARES
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, 'static')));

// DATABASE
const User = require('./model/user');

app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    console.log(await bcrypt.hash(password, 10));
    res.json({ status: 'ok' });
});

app.listen(8080, () => {
    console.log("Server up at 8080");
});