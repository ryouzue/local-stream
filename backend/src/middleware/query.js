import { log, reply } from '../utils/common.js';

export default function(model) {
  return async (req, res, next) => {
    try {
      let result = {};
      for (const key in req.query) {
        if(req.query.hasOwnProperty(key) && model.schema.path(key)) {
          const type = model.schema.path(key).instance;
          type === 'String' && (result[key] = { $regex: new RegExp(req.query[key], 'i') });
          type === 'Number' && (result[key] = Number(req.query[key]));
        }
      }
      
      req.queried = result;
      next();
    } catch(err) {
      log(2, 'Query Middleware »', err.message);
      return reply(res, 400, { error: 'Internal Server Error' });
    }
  }
}