// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const mongoUri = process.env.MONGODB_URI;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
if (!mongoUri) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/exercises', require('./routes/exercise.routes'));
app.use('/api/feedings', require('./routes/feeding.routes'));
app.use('/api/vet-visits', require('./routes/vet.routes'));
app.use('/api/pets', require('./routes/pet.routes'));
app.use('/api/dog-api', require('./routes/dog-api.routes'));
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 API running at http://127.0.0.1:${PORT}`);
});

