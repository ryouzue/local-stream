const { Router } = require('express');
const router = Router();

const anime = require('./anime.js');
const music = require('./music.js');

router.use('/anime', anime);
router.use('/music', music);

module.exports = router;
