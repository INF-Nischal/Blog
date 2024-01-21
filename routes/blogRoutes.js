const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const verifyToken = require("../middlewares/authMiddleware");

blogRouter.get("/blogAll", verifyToken, getAllBlogs);
blogRouter.get("/getBlog/:id", verifyToken, getBlogById);
blogRouter.post("/newBlog", verifyToken, createBlog);
blogRouter.delete("/deleteBlog/:id", verifyToken, deleteBlog);

module.exports = blogRouter;
