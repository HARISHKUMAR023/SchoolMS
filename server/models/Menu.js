const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String, // store icon class or URL if using images
    required: true
  },
  subMenuItems: [
    {
      name: String,
      link: String
    }
  ],
  roles: [String], // array of roles that can access this menu
  enabled: {
    type: Boolean,
    default: true
  }
});


module.exports = mongoose.model('Menu', MenuSchema);
