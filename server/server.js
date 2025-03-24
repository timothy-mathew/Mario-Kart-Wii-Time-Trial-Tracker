const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
// Update the CORS configuration to allow both local and Vercel domains
app.use(cors({
  origin: ['http://localhost:3000', 'https://mkwii-time-trialer.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Update the preflight request handler
app.options('/api/:path*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  res.status(200).json({});
});


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/timetrials', require('./routes/timeTrials'));

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MKWii Time Trial Tracker API' });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
