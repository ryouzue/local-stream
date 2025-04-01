import { Router } from 'express';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import Post from '../models/post.js';
import PostSchema, { optPostSchema } from '../schemas/valid.post.js';

import { query, querySeparate, queryCompare } from '../middleware/query.js';
import { verify } from '../middleware/validation.js';

const { debug } = config;
const router = Router();

router.get('/',
  query(Post),
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

router.get('/q',
  query(Post, true, true),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.post');
    try {
      const { query } = req;

      const post = await Post.findOne(query);
      if (!post) return reply(res, 404, { message: 'Post not found' });

      reply(res, 201, post);
    } catch (err) {
      log(2, req.method, '- routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.post('/',
  verify(PostSchema),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.post');
    try {
      const { body } = req;

      let post = await Post.findOne({ title: body.title })
      if (post) return reply(res, 400, { message: 'Post already exists' });

      post = await Post.create(body);
      reply(res, 201, post);
    } catch (err) {
      log(2, req.method, '- routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.put('/q',
  verify(optPostSchema),
  query(Post, true),
  querySeparate(),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.post');
    try {
      const { body, query, model, incl } = req;

      let post = await Post.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!post) return reply(res, 400, { message: 'Post not found' });

      const { result } = await queryCompare(post, body, model, false);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      result.add.forEach(key => post[key] = body[key]);
      result.del.forEach(key => delete post[key]);

      post = await Post.findOneAndReplace({ id: query.id }, { ...post, ...incl }, { new: true });
      reply(res, 200, post);
    } catch (err) {
      log(2, req.method, '- routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.patch('/q',
  verify(optPostSchema),
  query(Post, true),
  querySeparate(),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.post');
    try {
      const { body, query, model, incl } = req;

      let post = await Post.findOne({ id: query.id }).then(arr => arr.toObject());
      if (!post) return reply(res, 400, { message: 'Post not found' });

      const { result } = await queryCompare(post, body, model, true);
      if (result.unid.length > 0) return reply(res, 400, { message: 'Invalid properties', props: result.unid });
      if (result.state) return reply(res, 400, { message: 'No changes made' });

      post = await Post.findOneAndUpdate({ id: query.id }, { ...post, ...incl }, { new: true });
      reply(res, 200, post);
    } catch (err) {
      log(2, req.method, '- routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

router.delete('/q',
  query(Post, true),
  async (req, res) => {
    if (debug) log(4, req.method, '- routes.post');
    try {
      const { query } = req;

      let post = await Post.findOne({ id: query.id });
      if (!post) return reply(res, 404, { message: 'Post not found' });

      post = await Post.findOneAndDelete({ id: query.id });
      reply(res, 200, { message: 'Post deleted successfully', post });
    } catch (err) {
      log(2, req.method, '- routes.post »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

export default router;
