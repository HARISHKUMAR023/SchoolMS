const { body } = require('express-validator');

const validateStudent = [
  body('name').isString().withMessage('Name must be a string'),
  body('dob').isISO8601().withMessage('Date of Birth must be a valid date'),
  body('class').isString().withMessage('Class must be a string'),
  body('bloodGroup').isString().withMessage('Blood Group must be a string'),
  body('nationality').isString().withMessage('Nationality must be a string'),
  body('registrationNumber').isString().withMessage('Registration Number must be a string'),
  body('address').isString().withMessage('Address must be a string'),
  body('phoneNumber').isString().withMessage('Phone Number must be a string').isLength({ min: 10 }).withMessage('Phone Number must be at least 10 characters long'),
  body('academicInfo.admissionDate').isISO8601().withMessage('Admission Date must be a valid date'),
  body('academicInfo.aadhaarCardNumber').isString().withMessage('Aadhaar Card Number must be a string'),
  body('academicInfo.rollNumber').isString().withMessage('Roll Number must be a string'),
  body('parentDetails.fatherName').isString().withMessage('Father Name must be a string'),
  body('parentDetails.fatherOccupation').isString().withMessage('Father Occupation must be a string'),
  body('parentDetails.motherName').isString().withMessage('Mother Name must be a string'),
  body('parentDetails.motherOccupation').isString().withMessage('Mother Occupation must be a string'),
  body('parentDetails.parentPhoneNumber').isString().withMessage('Parent Phone Number must be a string').isLength({ min: 10 }).withMessage('Parent Phone Number must be at least 10 characters long')
];

module.exports = validateStudent;
