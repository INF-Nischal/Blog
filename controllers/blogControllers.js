const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error in getting all blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.log("Blog not found:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { ...blog } = req.body;
    await Blog.create({ ...blog });
    res.status(200).json({ message: "Blog created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog, deleteBlog };
