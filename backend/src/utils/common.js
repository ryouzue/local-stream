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
const time = () => magenta(`[${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}::${String(new Date().getMilliseconds()).padStart(3, '0')}]`);
const cap = str => str.replace(/(?:^|\s|-|:)(?![’'])(\w)/g, match => match.toUpperCase());

const reply = (res, state, ...rest) => {
  try { 
    isReply
      ? res.status(state).send(rest.length === 1 && typeof rest[0] === 'object' ? rest[0] : { message: rest }) 
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

export {
  time, cap, addr, 
  log, reply, args,
  colors as color
}