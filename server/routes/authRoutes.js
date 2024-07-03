const express = require('express');
const { register, login , getalluser , toggleUserActiveStatus} = require('../controllers/authController');
const { authorizeRoles } = require('../middleware/authorizeRoles');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
// Middleware to protect all routes below this line
router.use(authMiddleware);
router.post('/register',authorizeRoles(['admin', 'super-admin']), register);

router.get('/allusers', getalluser)
router.put('/users/:id', toggleUserActiveStatus);

module.exports = router;
