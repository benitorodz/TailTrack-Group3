// backend/models/Feeding.js
const mongoose = require('mongoose');

const feedingSchema = new mongoose.Schema(
  {
    petId: { type: String, required: true },
    petName: { type: String, required: true },
    date: { type: String, required: true },   // you can switch to Date later if you want
    time: { type: String, required: true },
    foodType: { type: String, required: true },
    portion: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feeding', feedingSchema);
