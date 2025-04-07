import { Router } from 'express';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Image from '../models/image.js';
import ImageSchema, { ImageSchemaOpt } from '../schemas/image.js';

import { query, querySeparate, queryCompare } from '../middleware/query.js';
import { verify } from '../middleware/validator.js';
import { single } from '../middleware/multer.js';

const { debug } = config;
const router = Router();

router.get('/',
  query(Image),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { query } = req;

      const data = await Image.find(query);
      if (!data) return reply(res, 404, { message: 'Images not found' });

      reply(res, 200, data);
    } catch (err) {
      next(err);
    }
  }
)

router.get('/q',
  query(Image, true, true),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { query } = req;

      const data = await Image.findOne(query);
      if (!data) return reply(res, 404, { message: 'Image not found' });

      reply(res, 200, data);
    } catch (err) {
      next(err);
    }
  }
)

router.post('/',
  single('image'),
  verify(ImageSchema),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { file, body } = req;

      let data = await Image.findOne({ file: file._id });
      if (data) return reply(res, 400, { message: 'Image already exists' });

      data = await Image.create({
        ...body,
        file: file._id
      });

      reply(res, 201, data);
    } catch (err) {
      next(err);
    }
  }
)

router.put('/q',
  verify(ImageSchema),
  query(Image, true),
  querySeparate(),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { body, query, model, incl } = req;

      let data = await Image.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!data) return reply(res, 400, { message: 'Image not found' });

      const { result } = await queryCompare(data, body, model, false);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      result.add.forEach(key => data[key] = body[key]);
      result.del.forEach(key => delete data[key]);

      data = await Image.findOneAndReplace(
        { id: query.id }, 
        { ...data, ...incl }, 
        { new: true }
      );
      reply(res, 200, data);
    } catch (err) {
      next(err);
    }
  }
)

router.patch('/q',
  single('image'),
  verify(ImageSchemaOpt),
  query(Image, true),
  querySeparate(),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { body, file, query, model, incl } = req;
      log(2, {
        body, 
        file, 
        query, 
        model, 
        incl
      });

      return reply(res, 200);
      let data = await Image.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!data) return reply(res, 400, { message: 'Image not found' });

      const { result } = await queryCompare(data, body, model, true);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      data = await Image.findOneAndUpdate(
        { id: query.id }, 
        { ...data, ...incl }, 
        { new: true }
      );
      reply(res, 200, data);
    } catch (err) {
      next(err);
    }
  }
)

router.delete('/q',
  query(Image, true),
  async (req, res, next) => {
    if (debug) log(4, req.method, '- routes.image');
    try {
      const { query } = req;

      let data = await Image.findOne({ id: query.id });
      if (!data) return reply(res, 404, { message: 'Image not found' });

      data = await Image.findOneAndDelete(data);
      reply(res, 200, { message: 'Image deleted successfully', data });
    } catch (err) {
      next(err);
    }
  }
)

export default router;
