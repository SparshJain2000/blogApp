const express = require("express"),
    app = express(),
    cors = require("cors"),
    User = require("./models/user.model"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStratergy = require("passport-local"),
    blogsRouter = require("./routes/blogs.router"),
    userRouter = require("./routes/user.router"),
    bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

app.use(
    require("express-session")({
        secret: "Jain",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStratergy({ usernameField: "username" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
