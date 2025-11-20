// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tailtrack';
mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/exercises', require('./routes/exercise.routes'));
app.use('/api/feedings', require('./routes/feeding.routes'));
app.use('/api/vet-visits', require('./routes/vet.routes'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 API running at http://127.0.0.1:${PORT}`);
});

