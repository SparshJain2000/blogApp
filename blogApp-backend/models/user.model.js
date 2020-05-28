const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
// });

// userSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
    }).plugin(passportLocalMongoose)
);
