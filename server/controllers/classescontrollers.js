const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

exports.createClass = async (req, res) => {
    const { name, sections } = req.body;

  // Check if class already exists
    const existingClass = await Class.findOne({ name });
    if (existingClass) {
        return res.status(409).json({ message: 'Class already exists.' });
    }
    const newClass = new Class({ name, sections });
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.send(classes);
      } catch (error) {
        res.status(500).send(error);
        }
}