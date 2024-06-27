// routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
    const { student, date, status } = req.body;

  // Check if attendance for this student and date already exists
  const existingAttendance = await Attendance.findOne({ student, date });

  if (existingAttendance) {
    return res.status(409).json({ message: 'Attendance already taken for this student on this date.' });
  }

  // If attendance does not exist, create a new attendance record
  const newAttendance = new Attendance({ student, date, status });

  try {
    const savedAttendance = await newAttendance.save();
    res.status(201).json({savedAttendance , message: 'Attendance taken successfully.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}
exports.DateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ date: req.params.date }).populate('student');
        res.send(attendance);
      } catch (error) {
        res.status(500).send(error);
      }
}