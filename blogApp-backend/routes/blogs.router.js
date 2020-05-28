const router = require("express").Router(),
    middleware = require("../middleware/index"),
    Blog = require("../models/blog.model");
router.get("/", middleware.isLoggedIn, (req, res) => {
    Blog.find()
        .then((blogs) => res.json(blogs))
        .catch((err) => res.json(err));
});
router.post("/", middleware.isLoggedIn, (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
    });
    Blog.create(blog)
        .then((blog) => {
            //add username and id to blog
            blog.author.username = req.user.username;
            blog.author.id = req.user._id;
            blog.save()
                .then((blog) => res.json(blog))
                .catch((err) => res.json({ err: err }));
            //save blog
            // pokemon.comments.push(blog);
            // pokemon.save();

            // console.log(comment);
            // req.flash('success', 'Successfully added comment');
            // res.redirect("/pokemon/" + pokemon._id);
        })
        .catch((err) => res.status(400).json({ err: err }));
});
router.get("/:id", middleware.isLoggedIn, (req, res) => {
    Blog.findById(req.params.body)
        .then((blog) => res.json(blog))
        .catch((err) => res.status(400).json({ err: err }));
});
router.put("/:id", middleware.checkBlogOwnership, (req, res) => {
    Blog.findById(req.params.id).then((blog) => {
        blog.title = req.params.title;
        blog.image = req.params.image;
        blog.body = req.params.body;
        blog.save()
            .then((updatedBlog) => res.json(updatedBlog))
            .catch((err) => res.status(400).json(err));
    });
});
router.delete("/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json("Blog deleted successfully !"))
        .catch((err) => res.status(400).json("error: " + err));
});
module.exports = router;
