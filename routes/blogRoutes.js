const express = require("express");
const blogRouter = express.Router();
const { createBlog, deleteBlog } = require("../controllers/blogControllers");

blogRouter.post("/newBlog", createBlog);
blogRouter.delete("/deleteBlog/:id", deleteBlog);

module.exports = blogRouter;
