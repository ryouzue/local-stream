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

      const result = await model.findOne(query);
      if (!result) return reply(res, 404, { message: `Not found (${cap(type)})` });

      req.query = result;
      next();
    } catch (err) {
      log(2, 'md.query »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}

export const separate = (...fields) => {
  return (req, res, next) => {
    if (debug) log(5, 'md.query-separate');
    try {
      const query = req.query.toObject();
      const included = {},
        excluded = {};

      for (const prop in query) {
        fields.includes(prop)
          ? included[prop] = query[prop]
          : excluded[prop] = query[prop];
      };

      req.incl = included;
      req.excl = excluded;
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
    const { excl: older, body: newer } = req;
    const result = { state: true, add: [], del: [], mod: [] };

    for (const key in older) {
      !newer.hasOwnProperty(key) && (
        result.del.push(key),
        result.state = false
      );
      older[key] !== newer[key] && (
        result.mod.push(key),
        result.state = false
      );
    }

    for (const key in newer) {
      !older.hasOwnProperty(key) && (
        result.add.push(key),
        result.state = false
      );
    }

    if (result.state) return reply(res, 400, { message: 'No modifications' });
    next();
  } catch (err) {
    log(2, 'md.query-compare »', err.message);
    return reply(res, 400, { error: 'Internal Server Error' });
  }
}
