const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },        // e.g., dog, cat, etc.
    breed: { type: String },
    birthday: { type: String },                    // store as ISO date string
    weight: { type: Number },                      // in lbs or kg
    summary: { type: String },
    medicalInfo: { type: String }                  // vaccinations, allergies, meds
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);