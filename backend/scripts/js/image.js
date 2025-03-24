const ffmpeg = require('fluent-ffmpeg');

const fs = require('fs');
const path = require('path');

const { log } = require('../common.js');

const thumbnail = (dir, name, dest) => {
  try {
    const filename = path.basename(name, path.extname(name)) + '.png';
    const filepath = path.join(dir, dest, filename);

    if(fs.existsSync(filepath)) return Promise.resolve(filepath);
    return new Promise((resolve, reject) => {
      ffmpeg(path.join(dir, name))
        .on('end', () => {
          resolve(filepath)
        })
        .on('error', (err) => {
          reject(err);
        })
        .screenshots({
          count: 1,
          folder: path.join(dir, dest),
          filename: filename,
          size: '320x?'
        });
    });
  } catch(err) {
    log(3, 'js.image', err.message);
    return;
  }
};

module.exports = { thumbnail };