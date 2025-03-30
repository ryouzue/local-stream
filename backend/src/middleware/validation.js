import { log, reply } from '../utils/common.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';

import config from '../../conf.json' assert { type: 'json' };
const { debug } = config;

export const verify = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      if (debug) log(5, 'md.valid');
      try {
        const result = validationResult(req);
        if (!result.isEmpty()) return reply(res, 400, result.array());

        req.data = matchedData(req);
        next();
      } catch (err) {
        log(2, 'md.valid »', err.message);
        return reply(res, 400, { error: 'Internal Server Error' });
      }
    }
  ];
}
