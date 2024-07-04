const express = require('express');
const router = express.Router();
const { createClass, createSection,feachclass ,featchSection} = require('../controllers/ClassSection');

// Create Class
router.post('/classes', createClass);

// Create Section
router.post('/sections', createSection);
router.get('/classes', feachclass);
router.get('/sections', featchSection);

module.exports = router;
