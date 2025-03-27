const mongoose = require('mongoose');
const Count = require('./__Count.js');

const VideoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true,
    default: 'None'
  },
  description: String,
  type: {
    type: String,
    enum: ['static', 'stream'],
    default: 'static'
  },
  isAdult: {
    type: Boolean,
    default: false
  },
  _file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileMeta',
    required: true
  }
});

VideoSchema.pre('save', async (next) => {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { id: 'id' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Video', VideoSchema);
