import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogDetail.css';
import Sidebar from './Sidebar';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!blog) return null;

    // Format date
    const date = new Date(blog.createdAt);
    const formattedDate = date.toLocaleString();

    return (
        <div>
            {localStorage.getItem('token') && <Sidebar/>}
        <div className="blog-detail-container">
            <h1>{blog.title}</h1>
            <p className="blog-author">By {blog.author || "Unknown Author"}</p>
            <p className="blog-date">Published on: {formattedDate}</p>
            <hr />
            <p className="blog-content">{blog.content}</p>
        </div>
        </div>
    );
};

export default BlogDetail;
