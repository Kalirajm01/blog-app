import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/BlogList.css';
import Sidebar from './Sidebar';

const BlogList = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [blogsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserBlogs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/by-username?username=${username}`);
                setAllBlogs(res.data || []);
            } catch (err) {
                setError(err.message || 'Error fetching blogs.');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserBlogs();
        }
    }, [username]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                alert('Blog deleted successfully!');
                setAllBlogs((prev) => prev.filter((blog) => blog._id !== id));
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete blog.');
        }
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

    if (loading) return <div className="center-text">Loading...</div>;
    if (error) return <div className="center-text error-text">Error: {error}</div>;

    return (
        <div>
            {token && <Sidebar />}
            <div className="container">
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    My Blogs <span style={{
                        background: '#2ecc71',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem'
                    }}>{allBlogs.length}</span>
                </h1>

                <div className="blog-list">
                    {currentBlogs.map((blog) => {
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

                                {isAuthor && (
                                    <div className="blog-actions">
                                        <Link to={`/edit-blog/${blog._id}`}>
                                            <FaEdit className="icon" />
                                        </Link>
                                        <button onClick={() => handleDelete(blog._id)} style={{ background: 'none', border: 'none' }}>
                                            <FaTrash className="icon" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
