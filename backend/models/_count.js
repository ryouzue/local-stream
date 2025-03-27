import { Schema, model } from 'mongoose';

const CountSchema = new Schema({
  seq: {
    type: Number,
    default: 0
  }
});

export default model('_Count', CountSchema);