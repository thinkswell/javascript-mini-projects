const blog = require("../controllers/blogs");
const express = require("express");
const route = express.Router();
route
  .get("/blogs", blog.blogs)
  .get("/blogs/user/:username", blog.blogs_sep_user)
  .get("/blogs/:id", blog.sep_blogs)
  .post("/blogs/add", blog.blog_add)
  .patch("/blogs/:id", blog.blog_edit)
  .delete("/blogs/:id", blog.blog_del)
  .post("/blogs/comment/:id", blog.addComment)
  .get("/blogs/category/:id", blog.sepCustomBlogs)
  .get("/blogs/search/:id", blog.search)
  .get("/users/search/:id",blog.user);
route.all('/blogs*', (req, res) => {
    res.status(404).json({ message: 'Not Found' }); // Return a 404 Not Found error
  });
exports.route = route;
