const mongoose = require('mongoose');

// Define the schema for visibility settings
const settingSchema = new mongoose.Schema({
  component: {
    type: String,
    required: true,
    unique: true, // Ensures each component has a unique entry
  },
  isVisible: {
    type: Boolean,
    required: true,
    default: true, // Default visibility is true
  },
});

// Create a model from the schema
const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
