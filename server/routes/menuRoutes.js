const express = require('express');
const router = express.Router();
const menuController = require('../controllers/DeveloperControllers/menuController');

// Route to create a new menu item
router.post('', menuController.createMenu);

router.get('', menuController.getallmenu);

// Route to get menu items for a specific role
router.get('/:role', menuController.getMenuItemsForRole);

// Route to update a menu item
router.put('/:id', menuController.updateMenu);

// Route to delete a menu item
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
