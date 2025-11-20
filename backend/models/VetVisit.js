
const mongoose = require('mongoose');

const vetVisitSchema = new mongoose.Schema(
  {
    petId: { type: String, required: true },
    date: { type: String, required: true },       // ISO date string: YYYY-MM-DD
    reason: { type: String, required: true },
    vetName: { type: String, required: true },
    diagnosis: { type: String },
    treatment: { type: String },
    nextAppointment: { type: String }             // ISO date string or empty
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);

module.exports = mongoose.model('VetVisit', vetVisitSchema);
