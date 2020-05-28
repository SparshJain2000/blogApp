const router = require("express").Router(),
    passport = require("passport"),
    User = require("../models/user.model");

//Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: `${req.user.username} Logged in` });
});

//Logout route
router.get("/logout", (req, res) => req.body.logout());

//Sign up route
router.post("/", (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
    });
    User.register(user, req.body.password)
        .then((user) => {
            passport.authenticate("local")(req, res, () => {
                res.json(user);
            });
        })
        .catch((err) => res.status(400).json({ err: err }));
});

module.exports = router;
