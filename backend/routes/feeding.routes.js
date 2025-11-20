// backend/routes/feedingRoutes.js
const express = require('express');
const Feeding = require('../models/Feeding');

const router = express.Router();

// GET /api/feedings?petId=demo-pet-1
router.get('/', async (req, res) => {
  try {
    const { petId } = req.query;
    const query = petId ? { petId } : {};
    const feedings = await Feeding.find(query).sort({ date: -1, time: -1 });
    res.json(feedings);
  } catch (err) {
    console.error('Error fetching feedings', err);
    res.status(500).json({ message: 'Error fetching feedings' });
  }
});

// POST /api/feedings
router.post('/', async (req, res) => {
  try {
    const feeding = new Feeding(req.body);
    const saved = await feeding.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating feeding', err);
    res.status(400).json({ message: 'Error creating feeding' });
  }
});

// PUT /api/feedings/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Feeding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Feeding not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating feeding', err);
    res.status(400).json({ message: 'Error updating feeding' });
  }
});

// DELETE /api/feedings/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Feeding.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Feeding not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting feeding', err);
    res.status(400).json({ message: 'Error deleting feeding' });
  }
});

module.exports = router;
