import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateBlog.css';
import Sidebar from './Sidebar';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const response = await axios.post('http://localhost:5000/api/blogs', { title, content, author: username }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setTitle('');
            setContent('');
            setAuthor('');
            setSuccess(true);
            setTimeout(() => navigate('/blogs'), 2000); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate('/blogs');
    };

    return (
        <div>
            <Sidebar />
            <div className="create-blog-container">
                <h1>Create a New Blog</h1>
                <form onSubmit={handleSubmit} className="create-blog-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" value={localStorage.getItem('username')} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="10" required></textarea>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Blog published successfully! Redirecting...</div>}
                    <div className="button-group">
                        <button type="submit" className="submit-button">Publish Blog</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateBlog;
