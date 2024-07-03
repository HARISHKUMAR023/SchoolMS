const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const validateStudent = require('../validations/studentValidation');
const upload = require('../middleware/multer');
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
// router.post('/', validateStudent, studentController.createStudent);
// router.put('/:id', validateStudent, studentController.updateStudent);
router.post('/', upload.single('photo'), studentController.createStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;
