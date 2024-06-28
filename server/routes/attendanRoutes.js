const express = require('express');
const router = express.Router();
const Attdenceroute = require('../controllers/attendancontrollers');

router.post('/', Attdenceroute.createAttendance);

module.exports = router;