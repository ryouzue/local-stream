const { Router } = require('express');
const router = Router();

// const user = require('./user.js');
const video = require('./video.js');
// const anime = require('./anime.js');

// router.use('/user', user);
router.use('/video', video);
// router.use('/anime', anime);

module.exports = router;
