const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user.js"); // users Collection
const bcrypt = require('bcryptjs');

// Middleware
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, 'static')));

// Connect to Database MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/login-app-db")
    .then(() => console.log(`Database is Connected`))
    .catch((err) => console.log({ msg: err }));


// Roughts
app.post("/api/register", async (req, res) => {

    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' });
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' });
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. should be atleast 6 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({ username, password });
        console.log(response);
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'username already in use' });
        }
        throw error
    }

    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
});