import { log, reply, addr, args } from '../scripts/common.js';
import { thumbnail } from '../scripts/.route.js';

import fs from 'fs';
import path from 'path';

// const { debug, media } = require('../conf.json');
// let dir;

// const ffmpeg = require('fluent-ffmpeg');

const anime = {
  HelloWorld: () => {
    console.log('Hello World!');
  }
}

export default { anime };