import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogList.css';
import Sidebar from './Sidebar';

const BlogListAll = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs?page=${currentPage}&limit=6`);
                setBlogs(res.data.blogs || []);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                setError(err.message || 'Something went wrong while fetching blogs.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    if (loading) return <div className="center-text">Loading...</div>;
    if (error) return <div className="center-text error-text">Error: {error}</div>;

    return (
        <div>
            {token && <Sidebar />}
            <div className="container">
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    My Blogs{' '}
                    <span style={{
                        background: '#2ecc71',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem'
                    }}>
                        {blogs.length}
                    </span>
                </h1>

                <div className="blog-list">
                    {blogs.map((blog) => {
                        const blogAuthor = typeof blog.author === 'string'
                            ? blog.author
                            : blog.author?.email || 'Unknown';

                        const isAuthor = blogAuthor === username;

                        return (
                            <div className="blog-card" key={blog._id}>
                                <h2>{blog.title}</h2>
                                <small>By {blogAuthor}</small>
                                <br />
                                <Link to={`/blogs/${blog._id}`} className="read-more">Read More</Link>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Section */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogListAll;
