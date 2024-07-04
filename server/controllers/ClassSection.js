const Class = require('../models/SudentClass');
const Section = require('../models/Section');

// Create Class
exports.createClass = async (req, res) => {
  const { name, teacherInCharge } = req.body;
  try {
    const newClass = new Class({ name, teacherInCharge });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// Create Section
exports.createSection = async (req, res) => {
  const { name, classId } = req.body;
  try {
    const newSection = new Section({ name, class: classId });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.feachclass = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).send('Server error');
    }
    }
exports.featchSection = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).send('Server error');
    }
    };
