import { Router } from 'express';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Post from '../models/post.js';
import PostSchema from '../schemas/valid.post.js';

import mongoErrHandler from '../handlers/mongoErrHandler.js';
import { search, separate, compare } from '../middleware/query.js';
import { verify } from '../middleware/validation.js';

const { debug } = config;
const router = Router();

router.get('/', 
  search(Post),
  async(req, res) => {
  if (debug) log(4, 'GET - routes.post');
  try {
    const post = await Post.find(req.query);
    if(!post) return reply(res, 400, 'No posts available');
    reply(res, 200, post);
  } catch(err) {
    log(2, 'GET - routes.post »', err.message);
    reply(res, 400, err.message);
  }
})

router.post('/',
  verify(PostSchema),
  async (req, res) => {
    if (debug) log(4, 'POST - routes.post');
    try {
      const { data } = req;
      const post = await Post.create(data)
        .catch(err => mongoErrHandler(err, res));
      res.status(201).json(post);
    } catch(err) {
      log(2, 'POST - routes.post »', err.message);
      reply(res, 400, err.message);
    }
  }
)

router.put('/',
  verify(PostSchema),
  search(Post),
  separate('_id', 'id', '__v'),
  compare,
  async(req, res) => {
    if (debug) log(4, 'PUT - routes.post');
    try {
      let { query, body, incl: data } = req;
      await Post.replaceOne(query, { ...data, ...body }, { new: true });

      const post = await Post.findOne({ id: query.id });
      res.status(200).json(post);
    } catch(err) {
      log(2, 'PUT - routes.post »', err.message);
      reply(res, 400, err.message);
    }
  }
)

router.patch('/',
  verify(PostSchema),
  async(req, res) => {
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
  }
)

router.delete('/', async(req, res) => {
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
