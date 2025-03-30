import { Router } from 'express';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Post from '../models/post.js';
import PostSchema, { updatePostSchema } from '../schemas/valid.post.js';

import { search, separate, compare } from '../middleware/query.js';
import { verify } from '../middleware/validation.js';

const { debug } = config;
const router = Router();

router.get('/',
  search(Post),
  async (req, res) => {
    if (debug) log(4, 'GET - routes.post');
    try {
      const { query } = req;
      const post = await Post.find(query);
      if (!post) return reply(res, 404, { message: 'Posts not found' });
      reply(res, 201, post);
    } catch (err) {
      log(2, 'GET - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.get('/query',
  search(Post),
  async (req, res) => {
    if (debug) log(4, 'GET - routes.post');
    try {
      const { query } = req;
      if (Object.keys(query).length === 0) return reply(res, 400, { message: 'No query provided' });
      const post = await Post.findOne(query);
      if (!post) return reply(res, 404, { message: 'Post not found' });
      reply(res, 201, post);
    } catch (err) {
      log(2, 'GET - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.post('/',
  verify(PostSchema),
  search(Post),
  async (req, res) => {
    if (debug) log(4, 'POST - routes.post');
    try {
      const { query } = req;
      let post = await Post.findOne({ title: query.title });
      if (post) return reply(res, 400, { message: 'Post already exists' });
      post = await Post.create(query);
      reply(res, 201, post);
    } catch (err) {
      log(2, 'POST - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.put('/query',
  verify(updatePostSchema),
  search(Post),
  separate('_id', 'id', '__v'),
  compare,
  async (req, res) => {
    if (debug) log(4, 'PUT - routes.post');
    try {
      let { query, body, excl } = req;
      post = await Post.findOneAndReplace(query, { ...excl, ...body }, { new: true });
      reply(res, 200, post);
    } catch (err) {
      log(2, 'PUT - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.patch('/query',
  verify(updatePostSchema),
  search(Post),
  separate('_id', 'id', '__v'),
  compare,
  async (req, res) => {
    if (debug) log(4, 'PATCH - routes.post');
    try {
      let { query, body, excl } = req;
      post = await Post.findOneAndUpdate(query, { ...excl, ...body }, { new: true });
      reply(res, 200, post);
    } catch (err) {
      log(2, 'PATCH - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.delete('/query',
  search(Post),
  async (req, res) => {
    if (debug) log(4, 'DELETE - routes.post');
    try {
      let { query, post } = req;
      post = await Post.findOneAndDelete(query);
      reply(res, 200, { message: 'Post deleted successfully', post });
    } catch (err) {
      log(2, 'DELETE - routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

export default router;
