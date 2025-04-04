import colors from 'colors';
const { 
  gray, cyan, yellow, 
  red, green, magenta 
} = colors;

const logtype = {
  0: gray('DEBUG'),
  1: cyan('INFO'),
  2: yellow('WARN'),
  3: red('ERROR'),
  4: green('SUCCESS'),
  5: gray('PASS')
}

import config from '../../conf.json' assert { type: 'json' };
const { 
  reply: isReply, 
  webhook: { 
    enable: isWebhook 
  } 
} = config;

import args from './arguments.js';
import webhook from './webhook.js';

const addr = req => `${req.protocol}://${req.get('host')}`;
const time = (sep = ':', raw = false) => {
  const now = new Date();
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const hr = String(now.getHours()).padStart(2, '0');

  const result = raw
    ? [hr, min, sec].join(sep)
    : [hr, min, sec, sep + ms].join(sep);

  return raw 
    ? result
    : magenta(`[${result}]`);
}

const cap = str => str.replace(/(?:^|\s|-|:)(?![’'])(\w)/g, match => match.toUpperCase());
const reply = (res, state, ...rest) => {
  try { 
    isReply
      ? res.status(state).send(rest.length === 1 
        && typeof rest[0] === 'object' 
          ? rest[0] 
          : { message: rest }) 
      : null;
  } catch(err) {
    return log(3, 'sc.reply »', err.message);
  }
}

const log = async(type, ...rest) => {
  try {
    if (isWebhook.enable) await webhook(log, time(), logtype[type], '::', ...rest);
    return console.log(time(), logtype[type], '::', ...rest);
  } catch(err) {
    log(3, 'sc.log »', err.message);
  }
};

const string = (length = 8) => {
  const chars = '0123456789';
  let result = '';
  for (let i = length; i > 0; --i) 
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export {
  time, cap, addr, 
  log, reply, args,
  colors as color,
  string
}