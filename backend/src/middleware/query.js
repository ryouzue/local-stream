import { log, reply, cap } from '../utils/common.js';

import config from '../../conf.json' assert { type: 'json' };
const { debug } = config;


export const search = (model) => {
  return async (req, res, next) => {
    if (debug) log(5, 'md.query');
    try {
      let query = {};
      let type;

      for (const key in req.query) {
        if (!req.query.hasOwnProperty(key) && !model.schema.path(key)) return;
        type = model.schema.path(key).instance;
        type === 'String' && (query[key] = { $regex: new RegExp(req.query[key], 'i') });
        type === 'Number' && (query[key] = Number(req.query[key]));
        type === 'Object' && (query[key] = { $in: req.query[key].split(',') });
      }

      req.model = model;
      req.query = query;
      next();
    } catch (err) {
      log(2, 'md.query »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}

export const separate = (...fields) => {
  return async (req, res, next) => {
    if (debug) log(5, 'md.query-separate');
    try {
      let { query, model, body } = req;
      let post = await model.findOne({ id: query.id }).then(post => post.toObject());
      if (!post) return reply(res, 404, { message: 'Post not found' });

      const excl = {};
      const incl = {};
      for (const prop in post) fields.includes(prop) && (excl[prop] = post[prop]);
      for (const prop in body) !fields.includes(prop) && (incl[prop] = post[prop]);

      req.excl = excl;
      req.incl = incl;
      next();
    } catch (err) {
      log(2, 'md.query-separate »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}

export const compare = async (req, res, next) => {
  if (debug) log(5, 'md.query-compare');
  try {
    const { body, excl, incl } = req;
    let state = false,
        once = false;

    log(2, {
      excl: excl,
      incl: incl
    })

    const protect = key => excl.hasOwnProperty(key);
    const compare = key => incl[key] === body[key];

    for (const key in body) {
      if (protect(key)) {
        log(4, 'Protect', key);
        continue;
      };

      if (compare(key)) {
        log(4, 'Compare', key)
        state = true;
      }
      // once && log(2, { key: key, old: incl[key], new: body[key] }), once = false;
    }

    if (state) return reply(res, 400, { message: 'No modifications' });
    next();
  } catch (err) {
    log(2, 'md.query-compare »', err.message);
    return reply(res, 400, { error: 'Internal Server Error' });
  }
}
