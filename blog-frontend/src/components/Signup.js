import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Signup</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <a href="/">Login</a></p>
                <button type="submit" className="button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
