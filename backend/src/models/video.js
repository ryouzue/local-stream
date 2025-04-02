import { Schema, model } from 'mongoose';
import Count from './_count.js'

const VideoSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    immutable: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  tags: [String],
  file: {
    type: Schema.Types.ObjectId,
    ref: '_File',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

VideoSchema.pre('save', async (next) => {
  try {
    if (this.isNew) {
      const counter = await Count.findOneAndUpdate(
        { name: 'Video' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    }
    next();
  } catch (err) {
    next(err)
  }
});

export default model('Video', VideoSchema);
