const express = require('express');
const router = express.Router();
const classController = require('../controllers/classescontrollers');
const validateStudent = require('../validations/studentValidation');

router.get('/', classController.getClasses);
// router.get('/:id', studentController.getStudentById);

router.post('/',  classController.createClass);

// router.delete('/:id', studentController.deleteStudent);

module.exports = router;
