import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  filename: {
    type: String,
    trim: true
  },
  originalname: {
    type: String,
    trim: true
  },
  encoding: String,
  path: String,
  length: Number,
  size: Number,
  mimetype: String
}, {
  versionKey: false,
  timestamps: true
});

export default model('_File', FileSchema);