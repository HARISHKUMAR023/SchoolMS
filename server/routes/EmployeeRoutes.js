const express = require('express');
const router = express.Router();
const EmployeeeController = require('../controllers/employees');
const validateStudent = require('../validations/studentValidation');

router.get('/', EmployeeeController.getAllEmployees);
router.get('/:id', EmployeeeController.getEmployeeById);
// router.post('/', validateStudent, studentController.createStudent);
// router.put('/:id', validateStudent, studentController.updateStudent);
router.post('/',  EmployeeeController.createEmployee);

// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
