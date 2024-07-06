const express = require('express');
const router = express.Router();
const Homework = require('../models/Homework');
const Student = require('../models/Student');
const sendSMS = require('../utils/sendSMS'); // Function to send SMS

exports.SmsHomework = async (req, res) => {
  const { classId, sectionId, homeworkText } = req.body;

  try {
    // Save homework to the database
    const homework = new Homework({ classId, sectionId, homeworkText });
    await homework.save();

    // Fetch students' phone numbers
    const students = await Student.find({ class: classId, section: sectionId });
    const phoneNumbers = students.map(student => student.phoneNumber);
     console.log(phoneNumbers);
    // Send SMS to students
    const messages = phoneNumbers.map(number => sendSMS(number, homeworkText));
    await Promise.all(messages);
    // console.log(messages);
    res.status(200).json({ message: 'Homework submitted and SMS sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit homework',error });
  }
}


