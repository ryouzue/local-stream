require('dotenv').config();
const { webhook } = process.env;
const axios = require('axios');

const filter = str => str
  .replace(/\x1B\[[0-9;]*m/g, '')
  .replace(/(https?:\/\/[^\s]+)/g, match => `\"${match}\"`);

const hook = async(log, ...message) => {
  if(Date.now() - 0 > 5000) return;
  try {
    if(!webhook.enable) return;
    const combine = message.join(' ');
    await axios.post(webhook.url, {
      content: `\`\`\`js\n${filter(combine)}\n\`\`\``
    });
  } catch (err) {
    if(err.message.includes('getaddrinfo')) return;
    log(3, 'sc.webhook »', err.message);
  }
}

module.exports = { hook };