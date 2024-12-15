// src/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const commitRoutes = require('./routes/commit.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', commitRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});