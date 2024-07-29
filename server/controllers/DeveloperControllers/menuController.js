const Menu = require('../../models/Menu');

// Create a new menu item
exports.createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enabled menu items for a specific role
exports.getMenuItemsForRole = async (req, res) => {
  try {
    const { role } = req.params;
    const menuItems = await Menu.find({ roles: role, enabled: true });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a menu item
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMenu) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu item
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getallmenu = async (req,res)=>{
try{
  const menuitems = await  Menu.find()
  res.status(200).json(menuitems)
}catch(error){

}
}
