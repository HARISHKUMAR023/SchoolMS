const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusdriverSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  licenseNumber: { type: String, required: true },
  routeNumber: { type: String, required: true },
  experience: { type: Number, required: true }
});

module.exports = mongoose.model('Busdriver', BusdriverSchema);
