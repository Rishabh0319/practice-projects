const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true }
}, { collection: 'users' });

const model = mongoose.model("UserScheme", UserSchema);

module.exports = model;