import { log, reply, addr, args } from '../scripts/common.js';
import { thumbnail } from '../scripts/.route.js';

import fs from 'fs';
import path from 'path';

// import { debug, media } = require('../conf.json');
// let dir;

// import ffmpeg = require('fluent-ffmpeg');

const store = {
  HelloWorld: () => {
    console.log('Hello World!');
  }
}

export default { store };