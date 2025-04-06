const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    app.use('/api/auth', authRoutes);
    app.use('/api/blogs', blogRoutes);
    
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(errorHandler);

