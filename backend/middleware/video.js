import { log, reply, addr, args } from '../scripts/common.js';
import { thumbnail } from '../scripts/.route.js';

import fs from 'fs';
import path from 'path';

const video = {
  what: () => {
    console.log('Hello World!');
  }
}

export default video;