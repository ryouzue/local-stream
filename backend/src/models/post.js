import { Schema, model } from 'mongoose';
import Count from './_count.js';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
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
}, {
  versionKey: false,
  timestamps: true
});

/* 
# PLANNED
-> Prevent case sensitive

# PROTOTYPE
PostSchema.index(
  { title: 1 }, 
  { unique: true, collation: 
    { locale: 'en', strength: 2 } 
  }
);
*/

PostSchema.pre('save', async (next) => {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { name: 'Post' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.id = counter.seq;
  }
  next();
}, {
  versionKey: false
});

export default model('Post', PostSchema);