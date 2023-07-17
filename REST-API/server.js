const express = require("express");
const port = 8000;
const app = express();
const Data = require("./Data.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// connecting Database
mongoose.connect("mongodb://127.0.0.1:27017/usersDatabase")
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log("Error: " + err));


// create Users Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    }
})


// creatig model of Schema
const User = mongoose.model("user", userSchema);


// ROUTES
app.get("/users", (req, res) => {
    const html = `${Data.map((item) => `<li>${item.first_name}<li>`).join("")}`;
    return res.status(200).send(html);
});

app.get("/api/users", (req, res) => {
    return res.status(200).json(Data);
})

app.get("/api/users/:id", (req, res) => {
    const id = req.params;
    return res.status(200).json("Hello ");
})

app.post("api/users", (req, res) => {
    const body = req.body;
    console.log(body);

    // if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.title)
    //     return res.status(400).json({ msg: "all fields is required" });

    return res.status(200).json({ msg: "success" });

});

app.listen(port, () => console.log(`Server is Running on ${port}`));
