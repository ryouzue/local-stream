const mongoose = require('mongoose');
const Count = require('./__Count.js');
 
const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  anime: {
    favorite: [String],
    status: {
      watching: [String],
      planning: [String],
      complete: [String],
    },
    progress: [{
      animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
      },
      time: Number,
      episode: Number
    }]
  },
  video: {
    progress: [{
      videoId: Number,
      time: Number
    }]
  }
})

UserSchema.pre('save', async (next) => {
  if (this.isNew) {
    const counter = await Count.findOneAndUpdate(
      { _id: 'userId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
  }
  next();
})

UserSchema.pre('save', async (next) => {
  if (this.isModified('password')) this.password = await argon2.hash(this.password);
  next();
})

module.exports = mongoose.model('User', UserSchema);