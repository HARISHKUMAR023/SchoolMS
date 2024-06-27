const express = require('express');
const { register, login , getalluser , toggleUserActiveStatus} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/allusers', getalluser)
router.put('/users/:id', toggleUserActiveStatus);

module.exports = router;
