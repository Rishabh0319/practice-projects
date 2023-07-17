const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user.js"); // users Collection

// Middleware
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, 'static')));

// Connect to Database MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/login-app-db");

// Roughts
app.post("/api/register", (req, res) => {
    console.log(req.body);
    res.json({ status: "ok Sab Changa se" });
});

app.listen(port, () => {

    console.log(`Server is Running on Port: ${port}`);
});