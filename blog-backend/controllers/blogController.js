const Blog = require('../models/Blog');
const User = require('../models/User');

const createBlog = async (req, res) => {
    try {
        const blog = new Blog({ ...req.body, author: req.body.author });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
            Blog.find().populate('author', 'email').skip(skip).limit(limit),
            Blog.countDocuments()
        ]);

        res.json({
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'email');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogCountByUsername = async (req, res) => {
    try {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const count = await Blog.countDocuments({ author: username });

        res.json({ username, blogCount: count });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getBlogsByUsername = async (req, res) => {
    try {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const blogs = await Blog.find({ author: username }).sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBlog, getBlogs, getBlogById, getBlogCountByUsername, getBlogsByUsername };
