const express = require('express');
const router = express.Router();
const componentsettingcontroler = require('../controllers/DeveloperControllers/Componetsettings')

router.post('/', componentsettingcontroler.createComponentSettings);
router.get('/', componentsettingcontroler.getingComponentSettings)

module.exports = router;