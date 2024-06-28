const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Teacher = require("../models/Teacher");
const Busdriver = require("../models/Busconductor");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// Import other type-specific models

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
  } = req.body;

  try {
    const employee = new Employee({
      name,
      dob,
      address,
      phoneNumber,
      email,
      joiningDate,
      employeeType,
      typeSpecificInfo,
    });

    const savedEmployee = await employee.save();

    if (employeeType === "teacher") {
      const teacher = new Teacher({
        ...typeSpecificInfo,
        employeeId: savedEmployee._id,
      });
      await teacher.save();

      const defaultPassword = "12345";
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const user = new User({
        name,
        email,
        password: defaultPassword,
        role: "teacher",
        active: true,
      });

      await user.save();
      console.log("User created with default password");
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

// // Create a new employee
// router.post('/', async (req, res) => {
//   const { name, dob, address, phoneNumber, email, joiningDate, employeeType, typeSpecificInfo } = req.body;

//   try {
//     const employee = new Employee({
//       name, dob, address, phoneNumber, email, joiningDate, employeeType, typeSpecificInfo
//     });

//     const savedEmployee = await employee.save();

//     if (employeeType === 'teacher') {
//       const teacher = new Teacher({ ...typeSpecificInfo, employeeId: savedEmployee._id });
//       await teacher.save();
//     }
//     if (employeeType === 'busdriver') {
//         const teacher = new Busdriver({ ...typeSpecificInfo, employeeId: savedEmployee._id });
//         await teacher.save();
//       }

//     // Handle other employee types similarly

//     res.status(201).json(savedEmployee);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get all employees
// router.get('/', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get a specific employee
// router.get('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) return res.status(404).json({ error: 'Employee not found' });

//     if (employee.employeeType === 'teacher') {
//       const teacher = await Teacher.findOne({ employeeId: employee._id });
//       return res.json({ ...employee._doc, typeSpecificInfo: teacher });
//     }
//     // Handle other employee types similarly

//     res.json(employee);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
