const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true }
});

module.exports = mongoose.model('Teacher', TeacherSchema);

