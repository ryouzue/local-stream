import { reply, log } from '../utils/common.js';

export const appErr = (err, req, res, next) => {
  if(err instanceof SyntaxError) 
    return reply(res, 400, { message: 'Malformed JSON body' });

  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  log(3, req.method, '»', err.message);
  return reply(res, code, message);
}