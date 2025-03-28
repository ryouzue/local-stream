import { Schema, model } from 'mongoose';
import Count from './_count.js';

const PostSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true
  },
  coverImage: String,
});

PostSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { name: 'Post' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.id = counter.seq;
  }
  next();
});

export default model('Post', PostSchema);