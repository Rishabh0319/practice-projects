const mongoose = require("mongoose");

// creating user Schema (Collection)
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { collection: "users" });

const model = mongoose.model("userSchema", UserSchema);

module.exports = model;