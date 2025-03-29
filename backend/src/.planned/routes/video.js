import { Router } from 'express';
import { query, validationResult as validate, checkSchema as verify } from 'express-validator';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Video from '../models/video.js';
import VideoSchema from '../schemas/valid.video.js';

const { debug } = config;
const router = Router();

router.post('/', async (req, res) => {
  if (debug) log(4, 'POST - routes.video');
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch(err) {
    log(2, 'POST - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

router.get('/', async(req, res) => {
  if (debug) log(4, 'GET - routes.video');
  try {
    const video = await Video.find();
    if(!video) return reply(res, 400, 'No videos available');
    res.status(200).json(video);
  } catch(err) {
    log(2, 'GET - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

router.get('/:id', async(req, res) => {
  if (debug) log(4, 'GET - routes.video');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const video = await Video.findById(id);
    if(!video) return reply(res, 404, 'Not found');

    const local = path.join(dir, video._file.source);
    if(!fs.existsSync(local)) return reply(res, 404, 'Not found');

    res.status(200).json(video);
  } catch(err) {
    log(2, 'GET - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

router.put('/:id', async(req, res) => {
  if (debug) log(4, 'PUT - routes.video');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if(!video) return reply(res, 404, 'Not found');

    res.status(200).json(video);
  } catch(err) {
    log(2, 'PUT - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

router.patch('/:id', async(req, res) => {
  if (debug) log(4, 'PATCH - routes.video');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if(!video) return reply(res, 404, 'Not found');

    res.status(200).json(video);
  } catch(err) {
    log(2, 'PATCH - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

router.delete('/:id', async(req, res) => {
  if (debug) log(4, 'DELETE - routes.video');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const video = await Video.findByIdAndDelete(id);
    if(!video) return reply(res, 404, 'Not found');

    res.status(200).json(video);
  } catch(err) {
    log(2, 'DELETE - routes.video »', err.message);
    reply(res, 400, err.message);
  }
})

export default router;
