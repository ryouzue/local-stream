import { Router } from 'express';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Video from '../models/video.js';
import VideoSchema from '../schemas/video.js';

import { query, querySeparate, queryCompare } from '../middleware/query.js';
import { verify } from '../middleware/validator.js';

const { debug } = config;
const router = Router();

router.get('/',
  query(Video),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { query } = req;

      const data = await Video.find(query);
      if (!data) return reply(res, 404, { message: 'Videos not found' });

      reply(res, 200, data);
    } catch (err) {
      log(2, 'GET - routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.get('/q',
  query(Video, true, true),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { query } = req;

      const data = await Video.findOne(query);
      if (!data) return reply(res, 404, { message: 'Video not found' });

      reply(res, 200, data);
    } catch (err) {
      log(2, req.method, '- routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.post('/',
  verify(VideoSchema),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { body } = req;

      let data = await Video.findOne({ title: body.title })
      if (data) return reply(res, 400, { message: 'Video already exists' });

      data = await Video.create(body);
      reply(res, 201, data);
    } catch (err) {
      log(2, req.method, '- routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.put('/q',
  verify(VideoSchema),
  query(Video, true),
  querySeparate(),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { body, query, model, incl } = req;

      let data = await Video.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!data) return reply(res, 400, { message: 'Video not found' });

      const { result } = await queryCompare(data, body, model, false);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      result.add.forEach(key => data[key] = body[key]);
      result.del.forEach(key => delete data[key]);

      data = await Video.findOneAndReplace({ id: query.id }, { ...data, ...incl }, { new: true });
      reply(res, 200, data);
    } catch (err) {
      log(2, req.method, '- routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.patch('/q',
  verify(VideoSchema),
  query(Video, true),
  querySeparate(),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { body, query, model, incl } = req;

      let data = await Video.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!data) return reply(res, 400, { message: 'Video not found' });

      const { result } = await queryCompare(data, body, model, true);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      data = await Video.findOneAndUpdate({ id: query.id }, { ...data, ...incl }, { new: true });
      reply(res, 200, data);
    } catch (err) {
      log(2, req.method, '- routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.delete('/q',
  query(Video, true),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.video');
    try {
      const { query } = req;

      let data = await Video.findOne({ id: query.id });
      if (!data) return reply(res, 404, { message: 'Video not found' });

      data = await Video.findOneAndDelete(data);
      reply(res, 200, { message: 'Video deleted successfully', data });
    } catch (err) {
      log(2, req.method, '- routes.video »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

export default router;
