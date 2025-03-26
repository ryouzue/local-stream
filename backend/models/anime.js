const mongoose = require('mongoose');
const Count = require('./__Count.js');

const EpisodeSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  _file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  }
});

const AnimeSchema = new mongoose.Schema({
  animeId: {
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
  episodes: [EpisodeSchema],
  duration: Number,
  date: {
    srt: Date,
    end: Date
  },
  season: {
    type: String,
    enum: ['winter', 'spring', 'summer', 'fall'],
    default: 'unknown'
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
    enum: ['japan', 'china', 'korea', 'other'],
    default: 'unknown'
  },
  synonym: [String]
});

AnimeSchema.pre('save', async (next) => {
  if (this.isNew) {
    const incr = await Count.findOneAndUpdate(
      { _id: 'animeId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.animeId = incr.seq;
  }
  next();
});

module.exports = mongoose.model('Anime', AnimeSchema);
