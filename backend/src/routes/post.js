import { Router } from 'express';
const router = Router();

import config from '../../conf.json' assert { type: 'json' };
const { debug } = config;

import { log, reply } from '../utils/common.js';

import Post from '../models/post.js';

router.post('/', async (req, res) => {
  if (debug) log(4, 'POST - routes.post');
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch(err) {
    log(2, 'POST - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.get('/', async(req, res) => {
  if (debug) log(4, 'GET - routes.post');
  try {
    const post = await Post.find();
    if(!post) return reply(res, 400, 'No posts available');
    res.status(200).json(post);
  } catch(err) {
    log(2, 'GET - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.get('/:id', async(req, res) => {
  if (debug) log(4, 'GET - routes.post');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const post = await Post.findById(id);
    if(!post) return reply(res, 404, 'Not found');

    const local = path.join(dir, post._file.source);
    if(!fs.existsSync(local)) return reply(res, 404, 'Not found');

    res.status(200).json(post);
  } catch(err) {
    log(2, 'GET - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.put('/:id', async(req, res) => {
  if (debug) log(4, 'PUT - routes.post');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if(!post) return reply(res, 404, 'Not found');

    res.status(200).json(post);
  } catch(err) {
    log(2, 'PUT - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.patch('/:id', async(req, res) => {
  if (debug) log(4, 'PATCH - routes.post');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if(!post) return reply(res, 404, 'Not found');

    res.status(200).json(post);
  } catch(err) {
    log(2, 'PATCH - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.delete('/:id', async(req, res) => {
  if (debug) log(4, 'DELETE - routes.post');
  try {
    const { id } = req.params;
    if(!id) return reply(res, 400, 'Bad request params');

    const post = await Post.findByIdAndDelete(id);
    if(!post) return reply(res, 404, 'Not found');

    res.status(200).json(post);
  } catch(err) {
    log(2, 'DELETE - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

export default router;
