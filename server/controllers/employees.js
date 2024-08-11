const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Teacher = require("../models/Teacher");
const Busdriver = require("../models/Busconductor");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');


faceapi.env.monkeyPatch({ Canvas, Image, ImageData });



// Import other type-specific models
exports.getTeacherAll = async (req,res)=>{
  try {
    const teachers = await Teacher.find().populate('employeeId', 'name');
    console.log(teachers);
    res.json(teachers);

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error fetching teachers:', error);
  }

}

exports.createEmployee = async (req, res) => {
  const {
    name,
    dob,
    address,
    phoneNumber,
    email,
    joiningDate,
    employeeType,
    typeSpecificInfo,
    faceImage // Assuming the face image is sent as a base64 string
  } = req.body;

  try {
    // Load face-api models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('public/models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('public/models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('public/models');

    // Create an image from base64
    const img = new Image();
    img.src = faceImage;

    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    
    let faceDescriptor = [];
    if (fullFaceDescription) {
      faceDescriptor = Array.from(fullFaceDescription.descriptor);
    }

    // Create and save the Employee
    const employee = new Employee({
      name,
      dob,
      address,
      phoneNumber,
      email,
      joiningDate,
      employeeType,
      typeSpecificInfo,
      faceDescriptor // Save the face descriptor
    });

    const savedEmployee = await employee.save();

    if (employeeType === "teacher") {
      const defaultPassword = "12345";
      const user = new User({
        name,
        email,
        password: defaultPassword, // Replace with hashedPassword in production
        role: "teacher",
        active: true,
      });

      const savedUser = await user.save();
      console.log("User created with default password");

      const teacher = new Teacher({
        ...typeSpecificInfo,
        employeeId: savedEmployee._id,
        userId: savedUser._id,
      });

      await teacher.save();
    }

    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ error: err.message });
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log('employes is feched')
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    if (employee.employeeType === "teacher") {
      const teacher = await Teacher.findOne({ employeeId: employee._id });
      return res.json({ ...employee._doc, typeSpecificInfo: teacher });
    }
    // Handle other employee types similarly

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherIdByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const teacher = await Teacher.findOne({ userId }); // Assuming your Teacher model has a field for userId

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ teacherId: teacher._id });
  } catch (error) {
    console.error('Error fetching teacher ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
