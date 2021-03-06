const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({

  groupID: {
    type: String,
    unique: true,
    required: true
  },
  
  messages: {
    type: Array,
    required: true
  },

  corpus: {
    type: String,
    default: null
  },

  debugMode: {
    type: Boolean,
    default: false
  },

  enabled: {
    type: Boolean,
    default: true
  }

});

module.exports = mongoose.model('group', groupSchema);