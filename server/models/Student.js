const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  photo: { type: String, default: 'uploads/student/default-photo.jpg' } ,// Default photo
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  // class: { type: String, required: true },
  // section:{type:String,required:true},
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SudentClass',
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },
  bloodGroup: { type: String, required: true },
  nationality: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  academicInfo: {
    admissionDate: { type: Date, required: true },
    aadhaarCardNumber: { type: String, required: true, unique: true },
    rollNumber: { type: String, required: true, unique: true },
  },
  parentDetails: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    parentPhoneNumber: { type: String, required: true },
  },
});

module.exports = mongoose.model('Student', studentSchema);
