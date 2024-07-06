const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  homeworkText: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Homework = mongoose.model('Homework', homeworkSchema);
module.exports = Homework;
