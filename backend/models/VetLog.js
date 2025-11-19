const { Schema, model } = require('mongoose');

const VetLogSchema = new Schema({
  petId: { type: String, required: true },
  date: { type: Date, required: true },
  vetName: { type: String, required: true },
  reason: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  nextAppointment: { type: Date }
}, { timestamps: true });

module.exports = model('VetLog', VetLogSchema);
