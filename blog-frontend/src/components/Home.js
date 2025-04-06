import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import Sidebar from './Sidebar';

const Home = () => {
    const [blogCount, setBlogCount] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (storedUsername) {
            setUsername(storedUsername);
        }

        const fetchBlogCountByUsername = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/count-by-username`, {
                    params: { username: storedUsername },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogCount(response.data.blogCount);
            } catch (error) {
                console.error('Error fetching blog count:', error.message);
            }
        };

        if (token && storedUsername) {
            fetchBlogCountByUsername();
        }
    }, []);

    return (
        <div>
            <Sidebar />
            <div className="home-container">
                <h1>Welcome back, <span className="username">{username}</span>!</h1>
                <p className="subtitle">Here's your blogging activity summary.</p>

                <div className="stats-box">
                    <h2>Total Blogs</h2>
                    <div className="count-box">{blogCount}</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
