// backend/routes/pet.routes.js
const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();

// GET /api/pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ name: 1 });
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets', err);
    res.status(500).json({ message: 'Error fetching pets' });
  }
});

// GET /api/pets/:id
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error fetching pet', err);
    res.status(400).json({ message: 'Error fetching pet' });
  }
});

// POST /api/pets
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const saved = await pet.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating pet', err);
    res.status(400).json({ message: 'Error creating pet' });
  }
});

// PUT /api/pets/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating pet', err);
    res.status(400).json({ message: 'Error updating pet' });
  }
});

// DELETE /api/pets/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pet.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting pet', err);
    res.status(400).json({ message: 'Error deleting pet' });
  }
});

module.exports = router;
