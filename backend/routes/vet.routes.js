// backend/routes/vet.routes.js
const express = require('express');
const VetVisit = require('../models/VetVisit');

const router = express.Router();

// GET /api/vet-visits?petId=demo-pet-1
router.get('/', async (req, res) => {
  try {
    const { petId } = req.query;
    const query = petId ? { petId } : {};
    const visits = await VetVisit.find(query).sort({ date: -1 });
    res.json(visits);
  } catch (err) {
    console.error('Error fetching vet visits', err);
    res.status(500).json({ message: 'Error fetching vet visits' });
  }
});

// POST /api/vet-visits
router.post('/', async (req, res) => {
  try {
    const visit = new VetVisit(req.body);
    const saved = await visit.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating vet visit', err);
    res.status(400).json({ message: 'Error creating vet visit' });
  }
});

// PUT /api/vet-visits/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await VetVisit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Vet visit not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating vet visit', err);
    res.status(400).json({ message: 'Error updating vet visit' });
  }
});

// DELETE /api/vet-visits/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await VetVisit.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Vet visit not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting vet visit', err);
    res.status(400).json({ message: 'Error deleting vet visit' });
  }
});

module.exports = router;
