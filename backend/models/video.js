import { Schema, model } from 'mongoose';
import Count from './_count.js'

const VideoSchema = new Schema({
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['static', 'stream'],
    required: true
  },
  isAdult: {
    type: Boolean,
    default: false
  },
  _Store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
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

export default model('Video', VideoSchema);
