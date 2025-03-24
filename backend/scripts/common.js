const { gray, cyan, yellow, red, green, magenta } = require('colors');
const logtype = {
  0: gray('DEBUG'),
  1: cyan('INFO'),
  2: yellow('WARN'),
  3: red('ERROR'),
  4: green('SUCCESS'),
  5: gray('PASS')
}

const { args } = require('./arguments.js');
const { reply: isReply, webhook: isHook } = require('../conf.json');
const { hook: webhook } = require('./webhook.js');

const addr = req => `${req.protocol}://${req.get('host')}`;
const time = () => magenta(`[${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}::${String(new Date().getMilliseconds()).padStart(3, '0')}]`);
const cap = str => str.replace(/(?:^|\s|-|:)(?![’'])(\w)/g, match => match.toUpperCase());

const reply = (res, state, ...rest) => {
  try { 
    isReply 
      ? res.status(state).send({ ...rest }) 
      : null;
  } catch(err) {
    return log(3, 'sc.reply »', err.message);
  }
}

const log = async(type, ...rest) => {
  try {
    if (isHook) await webhook(log, time(), logtype[type], '::', ...rest);
    return console.log(time(), logtype[type], '::', ...rest);
  } catch(err) {
    log(3, 'sc.log »', err.message);
  }
};

module.exports = {
  time, cap, addr, 
  log, reply, args
}