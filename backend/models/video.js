const mongoose = require('mongoose');
const Count = require('./__Count.js');

const VideoSchema = new mongoose.Schema({
  videoId: {
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
  _file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }
});

VideoSchema.pre('save', async (next) => {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { _id: 'videoId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this.videoId = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Video', VideoSchema);
