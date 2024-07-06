const express = require('express');
const router = express.Router();
const Homework = require('../controllers/Homeworkcontrollers');

router.post('/',  Homework.SmsHomework);
module.exports = router;