var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
});
blogSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Blog", blogSchema);
