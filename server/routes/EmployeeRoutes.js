const express = require('express');
const router = express.Router();
const EmployeeeController = require('../controllers/employees');
const validateStudent = require('../validations/studentValidation');

router.get('/', EmployeeeController.getAllEmployees);
router.get('/ep',EmployeeeController.getTeacherAll);
router.get('/:id', EmployeeeController.getEmployeeById);
router.post('/',  EmployeeeController.createEmployee);
router.get('/user/:userId', EmployeeeController.getTeacherIdByUserId);


module.exports = router;
