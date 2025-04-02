import { Schema, model } from 'mongoose';
import Count from './_count.js'

const ImageSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    immutable: true
  },
  author: {
    // type: Schema.Types.ObjectId,
    // ref: 'User'
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['static', 'animated'],
    default: 'static'
  },
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

ImageSchema.pre('save', async (next) => {
  try {
    if (this.isNew) {
      const counter = await Count.findOneAndUpdate(
        { name: 'Image' },
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

export default model('Image', ImageSchema);
