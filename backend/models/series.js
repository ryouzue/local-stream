const mongoose = require('mongoose');
const Count = require('./__count.js');

const Schema = new mongoose.Schema({
  eId: {
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
    enum: ['not yet released', 'releasing', 'finished']
  },
  episodes: Number,
  duration: Number,
  date: {
    srt: Date,
    end: Date
  },
  season: {
    type: String,
    enum: ['winter', 'spring', 'summer', 'fall'],
    year: Number
  },
  popularity: Number,
  favourites: Number,
  tags: [String],
  rating: Number,
  coverImage: {
    large: String,
    medium: String,
    small: String
  },
  bannerImage: String,
  isAdult: {
    type: Boolean,
    default: false
  },
  origin: {
    type: String,
    enum: ['japan', 'china', 'korea', 'other']
  },
  synonym: [String]
});

Schema.pre('save', async function (next) {
  if (this.isNew) {
    const incr = await Count.findOneAndUpdate(
      { _id: 'animeId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.eId = incr.seq;
  }
  next();
});

module.exports = mongoose.model('Anime', Schema);
