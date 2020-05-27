const router = require("express").Router(),
    User = require("../models/user.model");
router.post("/add", (req, res) => {
    res.json({ message: "Hello users" });
});

module.exports = router;
