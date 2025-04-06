import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('username', response.data.username); 
            navigate('/home'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="error-message">{error}</div>}
                <p>Don't have an account? <a href="/signup">Signup</a></p>
                <button type="submit" className="button">Login</button>
            </form>
        </div>
    );
};

export default Login;
