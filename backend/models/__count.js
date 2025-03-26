const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  seq: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('__Count', Schema);