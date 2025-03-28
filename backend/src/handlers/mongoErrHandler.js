import { log, reply, cap, color } from '../utils/common.js';

export function mongoErrHandler(err, res) {
  log(2, 'MongoDB Catch »', color.red(err.code));
  
  let match;
  if(err.code === 11000) {
    match = err.message.match(/{ title: "([^"]+)" }/);
    const value = match ? match[1] : null;
    
    match = err.message.match(/collection: ([^ ]+)/);
    const model = match ? cap(match[1].split('.').pop()) : null;

    return reply(res, 400, {
      error: 'MongoDB',
      message: `Duplicate key at ${model} { title: ${value} }`
    });
  }

  return reply(res, 400, {
    error: 'MongoDB',
    message: err.code
  });
}