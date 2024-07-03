const Student = require('../models/Student');
const { validationResult } = require('express-validator');
const path = require('path');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const student = new Student({
    ...req.body,
    photo: req.file ? req.file.path : 'uploads/student/default-photo.jpg' // Set default photo if none is uploaded
  });
console.log(student)
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    if (error.code === 11000) {  // Duplicate key error
      if (error.keyPattern.registrationNumber) {
        return res.status(400).json({ message: 'The registration number is already available in the database.' });
      }
      if (error.keyPattern.aadhaarCardNumber) {
        return res.status(400).json({ message: 'The Aadhaar card number is already available in the database.' });
      }
      if (error.keyPattern.rollNumber) {
        return res.status(400).json({ message: 'The roll number is already available in the database.' });
      }
    }
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const studentData = {
      ...req.body,
    };

    if (req.file) {
      studentData.photo = req.file.path;
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, studentData, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
