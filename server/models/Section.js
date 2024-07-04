const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  // Add any other fields you may need for the Section model
}, {
  timestamps: true,
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
