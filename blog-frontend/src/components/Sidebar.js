import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaPen, FaSignOutAlt, FaBars } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="hamburger" onClick={toggleSidebar}>
                <FaBars />
            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/home" className={`sidebar-link ${isActive('/home') ? 'active' : ''}`}>
                            <FaHome className="icon" />
                            <span className="tooltip">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/blogs" className={`sidebar-link ${isActive('/blogs') ? 'active' : ''}`}>
                            <FaBook className="icon" />
                            <span className="tooltip">Blogs</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/create-blog" className={`sidebar-link ${isActive('/create-blog') ? 'active' : ''}`}>
                            <FaPen className="icon" />
                            <span className="tooltip">Create Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="sidebar-link">
                            <FaSignOutAlt className="icon" />
                            <span className="tooltip">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
