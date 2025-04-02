import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  length: {
    type: Number,
    required: true
  },
  size: { 
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('_File', FileSchema);