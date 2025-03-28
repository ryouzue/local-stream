import { Schema, model } from 'mongoose';
import Count from './_count.js';

import { argon2id as argon } from 'argon2';
 
const AnimeProgSchema = new Schema({
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Anime'
  }],
  status: {
    watching: [{
      type: Schema.Types.ObjectId,
      ref: 'Anime'
    }],
    planning: [{
      type: Schema.Types.ObjectId,
      ref: 'Anime'
    }],
    complete: [{
      type: Schema.Types.ObjectId,
      ref: 'Anime'
    }],
  }
});

const VideoProgSchema = new Schema({
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }],
  timeline: [{
    videoId: Number,
    time: Number
  }]
})

const UserSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  progress: {
    anime: [AnimeProgSchema],
    video: [VideoProgSchema]
  }
})

UserSchema.pre('save', async (next) => {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { id: 'id' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
})

UserSchema.pre('save', async (next) => {
  if (this.isModified('password')) this.password = await argon.hash(this.password);
  next();
})

export default model('User', UserSchema);