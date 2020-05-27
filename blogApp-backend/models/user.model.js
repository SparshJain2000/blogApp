const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
