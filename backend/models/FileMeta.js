const mongoose = require('mongoose');

const FileMetaSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  }, 
  length: Number,
  size: Number,
  type: {
    type: String,
    enum: ['video', 'audio', 'image']
  },
  format: {
    type: String,
    enum: ['mp4', 'mkv', 'webm']
  }
});

module.exports = mongoose.model('FileMeta', FileMetaSchema);