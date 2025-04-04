import { reply } from '../utils/common.js';

export const appErr = (err, req, res, next) => {
  if(err instanceof SyntaxError) 
    return reply(res, 400, { message: 'Malformed JSON body' });

  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return reply(res, code, { code, message });
}