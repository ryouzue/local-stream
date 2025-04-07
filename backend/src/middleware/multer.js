import multer, { diskStorage } from 'multer';
import { log, reply, time, string } from '../utils/common.js';

import path from 'path'
import fs from 'fs';;

import config from '../../conf.json' assert { type: 'json' };
const { media } = config;

import _File from '../models/_file.js';

const ext = file => path.extname(file.originalname);
const fon = file => file.originalname.replace(ext(file), '');
const loc = file => fs.existsSync(file.path);

const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(media, file.fieldname);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fn = (time('-', true), string(10) + ext(file));
    cb(null, fn);
  }
})

const write = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

export const upload = (field, options = {}) => {
  const {
    ow = false,
    rq = true,
    up = true,
    at = null
  } = options;

  return async (req, res, next) => {
    try {
      const store = write.single(field);
      store(req, res, async (err) => {
        if (err) return next(err);

        const { file } = req;
        
        if (!file && rq) return next(new Error('File is required'));
        if (!file && !rq) return next();

        let exist = null;
        if (ow && req.params.id) {
          let model = req.model;
          if (!model) return next(new Error('Model is required'));

          model = await model.findOne({ _id: req.params.id });
          if (!model) return next(new Error('File not found'));

          // exist = await model.findOne({ parent: model._id, originalname: fon(file) });
        }
        // let data = await _File.findOne({ originalname: fon(file) });
        
      })
    } catch (err) {
      next(err);
    }
  }
}

export const single = (field) => {
  return (req, res, next) => {
    try {
      upload().single(field)(req, res, async (err) => {
        if (err) return next(err);

        const { file } = req;
        log(2, file);
        if (!file) return next(new Error('File is required'));

        let data = await _File.findOne({ originalname: fon(file) });
        if (!data) data = await _File.create({ ...file, originalname: fon(file) });

        req.file = data;
        next();
      })
    } catch (err) {
      next(err);
    }
  }
}

export const multi = (field, limit) => {
  return (req, res, next) => {
    try {
      upload().array(field, limit)(req, res, (err) => {
        if (err) return next(err);
        next();
      })
    } catch (err) {
      next(err);
    }
  }
}