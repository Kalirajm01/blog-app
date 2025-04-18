const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogById, getBlogCountByUsername, getBlogsByUsername } = require('../controllers/blogController');

router.post('/', createBlog);
router.get('/count-by-username', getBlogCountByUsername);
router.get('/by-username', getBlogsByUsername);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'email');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
safasfa

module.exports = router;
