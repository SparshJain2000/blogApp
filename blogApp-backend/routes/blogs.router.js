const router = require("express").Router(),
    Blog = require("../models/blog.model");
router.get("/", (req, res) => {
    res.json({ message: "Hello blogs" });
});

router.get("/:id", (req, res) => {
    res.json({ message: "Hello blogs" });
});

module.exports = router;
