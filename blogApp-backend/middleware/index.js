const Blog = require("../models/blog.model"),
    middleware = {};
middleware.isLoggedIn = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(400).json({ err: "Not Logged in" });
};
middleware.checkBlogOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        //Is Authorized
        Blog.findById(req.params.id)
            .then((foundBlog) => {
                foundBlog.author.id.equals(req.user._id)
                    ? next()
                    : res.status(400).json({ err: "Not the Author" });
            })
            .catch((err) => res.status(400).json({ err: err }));
    }
};
module.exports = middleware;
