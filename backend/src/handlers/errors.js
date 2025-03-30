import { log, reply } from '../utils/common.js';

export const appErr = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    log(2, req.method, '- app.syntax-error »', err.message);
    return reply(res, 400, { message: 'Malformed JSON body' });
  }

  next(err);
}