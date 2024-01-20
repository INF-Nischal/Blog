const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const { ...blog } = req.body;
    await Blog.create({ ...blog });
    res.status(200).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createBlog, deleteBlog };
