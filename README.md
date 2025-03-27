## Stream Platform - Project

- This project is in beta so expect issues 
- There is no semantic versioning to keep track of the progress
- I'm working on this based on personal interest
<br>

## Future plans - 3 / 25 / 2025

1. Rewrite the backend (again) plus include mongo database for faster performance
> Create an entry in the database for non saved content in specific collection/s
2. **UPDATED**: Improve data entries on the backend

<details>
  <summary>New - mongo Anime schema</summary>

```js
{
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
  genres: [String],
  rating: Number,
  coverImage: {
    lr: String,
    md: String,
    sm: String
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
}
```
</details>
<details>
  <summary>New - mongo Video schema</summary>
  
```js
{
  eId: {
    type: Number,
    unique: true
  },
  title: String,
  description: String,
  type: {
    type: String,
    enum: ['static', 'stream'],
    default: 'static'
  },
  isAdult: {
    type: Boolean,
    default: false
  },
  length: {
    time: Number,
    size: Number
  },
  video: {
    type: String,
    required: true
  },
  cover: String
}
```
</details>

<br>

## Wish to support me and this project?
If you have any ideas to help me out, dm on discord or create an issue letting me know!
