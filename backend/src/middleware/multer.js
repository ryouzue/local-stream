import multer, { diskStorage } from 'multer';
import { log, reply, time, string } from '../utils/common.js';

import path from 'path'
import fs from 'fs';;

import config from '../../conf.json' assert { type: 'json' };
const { media } = config;

import _File from '../models/_file.js';

export const storage = () => {
  try {
    return diskStorage({
      destination: (req, file, cb) => {
        const dir = path.join(media, file.fieldname);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const name = (time('-', true), string(10) + path.extname(file.originalname));
        cb(null, name);
      }
    });
  } catch(err) {
    log(3, 'md.multer', err.message);
  }
};

export const upload = {
  def: multer({ 
    storage: storage() 
  }),

  single: (field) => {
    return (req, res, next) => {
      upload.def.single(field)(req, res, async (err) => {
        try {
          if (err) return reply(res, 500, { error: 'Internal Server Error' });

          const { file, body } = req;
          if (!file) return reply(res, 400, { message: 'Bad Request' });

          const origin = file.originalname.replace(path.extname(file.originalname), '');
          let data = await _File.findOne({ originalname: origin });
          if (data) return reply(res, 400, { message: 'File already exists' });
          if (field !== file.fieldname) return reply(res, 400, { message: `File must be an ${field.replace(/\'|\"/g, '')}` });

          data = await _File.create({ ...file, originalname: origin });
          req.file = data;
          req.body = body;

          next();
        } catch(err) {
          log(2, 'md.multer - upload.single »', err.message);
          reply(res, 500, { error: 'Internal Server Error' });
        }
      })
    }
  },

  multi: (field, limit) => {
    return (req, res, next) => {
      upload.def.array(field, limit)(req, res, (err) => {
        if(err) return reply(res, 500, { error: 'Internal Server Error' });

        next();
      })
    }
  }
}