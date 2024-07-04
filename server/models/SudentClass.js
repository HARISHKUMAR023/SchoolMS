const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacherInCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  // Add any other fields you may need for the Class model
}, {
  timestamps: true,
});

const SudentClass = mongoose.model('SudentClass', classSchema);

module.exports = SudentClass;
