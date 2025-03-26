const mongoose = require('mongoose');
const Count = require('./__Count.js');

const VideoSchema = new mongoose.Schema({
  eId: {
    type: Number,
    unique: true
  },
  title: String,
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
  length: {
    time: Number,
    size: Number
  },
  video: {
    type: String,
    required: true
  },
  cover: String
});

VideoSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { _id: 'videoId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this.eId = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Video', VideoSchema);
