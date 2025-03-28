import { Schema, model } from 'mongoose';

const CountSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

export default model('_Count', CountSchema);