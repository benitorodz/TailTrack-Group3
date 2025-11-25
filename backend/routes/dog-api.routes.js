// backend/routes/dog-api.routes.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

// GET /api/dog-api/breeds
router.get('/breeds', async (req, res) => {
  try {
    const apiKey = process.env.DOG_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'DOG_API_KEY is not configured.' });
    }

    // Fetch all dog breeds from The Dog API
    const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey }
    });

    // Map to a simplified structure tailored for your app
    const breeds = response.data.map(b => ({
      id: b.id,
      name: b.name,
      temperament: b.temperament || '',
      lifeSpan: b.life_span || '',
      weight: b.weight?.imperial || '',
      imageUrl: b.image?.url || ''
    }));

    res.json({ breeds });
  } catch (err) {
    console.error('Dog API error:', err.response?.status, err.response?.data || err.message);
    res.status(500).json({ message: 'Error calling Dog API' });
  }
});

module.exports = router;
