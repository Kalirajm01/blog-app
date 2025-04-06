import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CreateBlog from './components/CreateBlog';
import BlogList from './components/BlogList';
import BlogListAll from './components/BlogList-All';
import BlogDetail from './components/BlogDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route 
                    path="/create-blog" 
                    element={
                        <PrivateRoute>
                            <CreateBlog />
                        </PrivateRoute>
                    } 
                />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs-all" element={<BlogListAll />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
