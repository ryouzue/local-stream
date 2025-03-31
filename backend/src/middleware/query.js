import { log, reply, cap } from '../utils/common.js';

import config from '../../conf.json' assert { type: 'json' };
const { debug } = config;

export const query = (model) => {
  return async (req, res, next) => {
    if (debug) log(5, 'md.query \u2604');
    try {
      let query = {};

      /* Resolve query based on existing schema property */
      for (const key in req.query) {
        if (!req.query.hasOwnProperty(key) && !model.schema.path(key)) return;
        const type = model.schema.path(key).instance;
        switch (type) {
          case 'String': query[key] = { $regex: new RegExp(req.query[key], 'i') }; break;
          case 'Number': query[key] = Number(req.query[key]); break;
          case 'Object': query[key] = { $in: req.query[key].split(',') }; break;
        }
      }

      req.model = model;
      req.query = query;
      log(5, '»', query);
      next();
    } catch (err) {
      log(2, 'md.query »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}

const separate = (body, fields) => {
  const def = ['_id', 'id', '__v', 'createdAt', 'updatedAt'];
  if (fields && fields.length > 0) def.push(...fields);

  let incl = {}, excl = {};
  /* Resolve separation between protected and regular properties */
  for (const key of Object.keys(body)) {
    if (!def.includes(key)) incl[key] = body[key];
    else excl[key] = body[key];
  }

  return { incl, excl };
};

export const protect = (...fields) => {
  return async (req, res, next) => {
    if (debug) log(5, 'md.query-separate \u2604');
    try {
      const { body } = req;
      if (!body) return reply(res, 400, { message: 'No body provided' });

      const { incl, excl } = separate(body, fields);
      if (!(Object.keys(excl).length === 0)) return reply(res, 400, { message: 'You cannot modify protected properties!', props: excl });

      req.incl = incl;
      next();
    } catch (err) {
      log(2, 'md.query-separate »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}

export const compare = async (post, body, model, partial) => {
  if (debug) log(5, 'md.query-compare \u2604');
  try {
    const { incl } = separate(post);
    let result = { state: true, unid: [], mod: [], add: [], del: [] }
 
    /* Compare body with included properties */
    for (const key in body) {
      if (!body.hasOwnProperty(key)) continue;
      if (!model.schema.path(key)) result.unid.push(key);
      if (!incl.hasOwnProperty(key) 
        && model.schema.path(key)) result.add.push(key) 
          && (result.state = false);
      else if (incl.hasOwnProperty(key) 
        && incl[key] !== body[key]) result.mod.push(key) 
          && (result.state = false);
    }

    /* Compare included properties with body */
    for (const key in incl) {
      if (!incl.hasOwnProperty(key)
        || body.hasOwnProperty(key)) continue;
      if(!partial) result.del.push(key)
        && (result.state = false);
    }

    return { result };
  } catch (err) {
    log(2, 'md.query-compare »', err.message);
  }
}
