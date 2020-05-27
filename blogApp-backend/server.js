const express = require("express"),
    app = express(),
    cors = require("cors"),
    mongoose = require("mongoose"),
    blogsRouter = require("./routes/blogs.router"),
    userRouter = require("./routes/user.router"),
    bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
    console.log("connected to MONGO");
});

app.get("/", (req, res) => {
    res.json({ name: "sparsh jain" });
});
app.use("/blogs", blogsRouter);
app.use("/users", userRouter);

const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
