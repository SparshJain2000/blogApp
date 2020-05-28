const router = require("express").Router(),
    middleware = require("../middleware/index"),
    Blog = require("../models/blog.model");
//===========================================================================
//get all blogs
router.get("/", middleware.isLoggedIn, (req, res) => {
    Blog.find()
        .then((blogs) => res.json({ blogs: blogs, user: req.user }))
        .catch((err) => res.json(err));
});
//===========================================================================
//post a blog
router.post("/", middleware.isLoggedIn, (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
    });
    console.log(req.user);
    Blog.create(blog)
        .then((blog) => {
            blog.author.username = req.user.username;
            blog.author.id = req.user._id;
            blog.save()
                .then((blog) => res.json({ blog: blog, user: req.user }))
                .catch((err) => res.json({ err: err, user: req.user }));
        })
        .catch((err) => res.status(400).json({ err: err, user: req.user }));
});
//===========================================================================
//get a blog by id
router.get("/:id", middleware.isLoggedIn, (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => res.json(blog))
        .catch((err) => res.status(400).json({ err: err }));
});
//===========================================================================
//update a blog
router.put("/:id", middleware.checkBlogOwnership, (req, res) => {
    Blog.findById(req.params.id).then((blog) => {
        blog.title = req.body.title;
        blog.image = req.body.image;
        blog.body = req.body.body;
        blog.save()
            .then((updatedBlog) => res.json(updatedBlog))
            .catch((err) => res.status(400).json(err));
    });
});
//===========================================================================
//delete a blog
router.delete("/:id", middleware.isLoggedIn, (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json("Blog deleted successfully !"))
        .catch((err) => res.status(400).json("error: " + err));
});
//===========================================================================
module.exports = router;
