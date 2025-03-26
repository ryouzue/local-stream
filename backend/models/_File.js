const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  }, 
  length: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'audio', 'image']
  },
  format: {
    type: String,
    enum: ['mp4', 'mkv', 'webm']
  }
});

module.exports = mongoose.model('File', FileSchema);