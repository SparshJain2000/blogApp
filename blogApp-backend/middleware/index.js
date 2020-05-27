const Blog = require("../models/blog.model");
const middleware = {};
middleware.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
};
middleware.checkBlogOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        //Is Authorized
        Blog.findById(req.params.id, (err, foundBlog) => {
            if (err) {
                res.status(400).json("error: Blog Not Found");
            } else {
                if (foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.status(400).json("error: Not the Author");
                }
            }
        });
    } else {
        res.status(400).json("error: Not Logged In");
    }
};

module.exports = middleware;
