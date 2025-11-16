const { Schema, model } = require('mongoose');

const ExerciseSchema = new Schema({
  petId: { type: String, required: true },
  date: { type: Date, required: true },
  activityType: { type: String, required: true, enum: ['Walk','Run','Play','Swim','Hike','Training','Other'] },
  durationMinutes: { type: Number, required: true, min: 0 },
  distanceKm: { type: Number, default: 0, min: 0 },
  notes: { type: String, maxlength: 500 }
}, { timestamps: true });

module.exports = model('Exercise', ExerciseSchema);
