const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  employeeType: { type: String, required: true },
  typeSpecificInfo: { type: Schema.Types.Mixed, required: true } // This can store embedded document or reference
});

module.exports = mongoose.model('Employee', EmployeeSchema);
