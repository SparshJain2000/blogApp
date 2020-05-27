const router = require("express").Router(),
    User = require("../models/user.model");

//Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: `${req.user} Logged in` });
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
        .catch((err) => res.json(err));
});

module.exports = router;
