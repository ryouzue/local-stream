import { Schema, model } from 'mongoose';

const StoreSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: { 
    type: String,
    enum: ['video', 'audio', 'image'],
    required: true
  },
  format: {
    type: String,
    enum: [
      'mp4', 'mkv', 'webm',
      'mp3', 'opus', 'ogg',
      'png', 'jpg', 'jpeg'
    ],
    required: true
  }
});

export default model('Store', StoreSchema);