const express = require('express');
const router = express.Router();
const Dashbordroute = require('../controllers/DashbordController');

router.get('/studentcount', Dashbordroute.totalStudent)

module.exports = router;