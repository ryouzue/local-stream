import { Schema, model } from 'mongoose';
import Count from './_count.js';

const AnimeSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    eng: String,
    romaji: String,
    native: String
  },
  description: String,
  type: {
    type: String,
    enum: ['series', 'movie', 'special']
  },
  status: {
    type: String,
    enum: ['finished', 'releasing', 'not yet released', 'cancelled']
  },
  episodes: [{
    index: {
      type: Number,
      required: true,
      unique: true
    },
    _Store: {
      type: Schema.Types.ObjectId,
      ref: 'Store'
    }
  }],
  duration: Number,
  date: {
    srt: Date,
    end: Date
  },
  season: {
    type: String,
    enum: ['winter', 'spring', 'summer', 'fall']
  },
  seasonYear: Number,
  popularity: {
    type: Number,
    default: 0
  },
  favourites: {
    type: Number,
    default: 0
  },
  tags: [String],
  rating: Number,
  bannerImage: String,
  isAdult: {
    type: Boolean,
    default: false
  },
  origin: {
    type: String,
    enum: ['japan', 'south korea', 'china', 'taiwan']
  },
  synonym: [String]
});

AnimeSchema.pre('save', async (next) => {
  if (this.isNew) {
    const incr = await Count.findOneAndUpdate(
      { id: 'id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = incr.seq;
  }
  next();
});

export default model('Anime', AnimeSchema);
