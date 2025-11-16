const router = require('express').Router();
const Exercise = require('../models/Exercise');

// CREATE
router.post('/', async (req, res) => {
  try {
    const item = await Exercise.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// LIST (optional filter by petId)
router.get('/', async (req, res) => {
  try {
    const { petId } = req.query;
    const q = petId ? { petId } : {};
    const items = await Exercise.find(q).sort({ date: -1, createdAt: -1 });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// READ one
router.get('/:id', async (req, res) => {
  const item = await Exercise.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Exercise.findByIdAndDelete(req.params.id);
  res.json({ ok: !!deleted });
});

module.exports = router;
