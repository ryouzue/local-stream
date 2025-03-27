import { log, reply, addr, args } from '../scripts/common.js';
import { thumbnail } from '../scripts/.route.js';

import fs from 'fs';
import path from 'path';

const store = {
  what: () => {
    console.log('Hello World!');
  }
}

export default store;