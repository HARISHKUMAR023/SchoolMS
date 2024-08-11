const mongoose = require('mongoose');
const ModuleConfigSchema = new mongoose.Schema({
    library: { type: Boolean, default: true },
    transport: { type: Boolean, default: true },
    attendance: { type: Boolean, default: true },
  });
  module.exports = mongoose.model('ModuleConfig', ModuleConfigSchema);