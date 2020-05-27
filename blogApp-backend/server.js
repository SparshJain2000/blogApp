const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
    console.log("connected to atlas");
});

app.get("/", (req, res) => {
    res.json({ name: "sparsh jain" });
});

const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
