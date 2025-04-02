import multer, { diskStorage } from 'multer';
import { log, reply } from '../utils/common.js';

import path from 'path'
import fs from 'fs';;

import config from '../../conf.json' assert { type: 'json' };
const { media } = config;

const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(media, file.fieldname);
    log(2, dir, fs.existsSync(dir));

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    log(2, fs.existsSync(dir));

    return;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    return;
    cb(null, 
      `${Date.now()} - ${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({ storage });

export default { upload };