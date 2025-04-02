import { reply } from '../utils/common.js';

export const appErr = (err, req, res, next) => {
  if(err instanceof SyntaxError) 
    return reply(res, 400, { message: 'Malformed JSON body' });

  next(err);
}