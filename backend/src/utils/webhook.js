import dotenv from 'dotenv';
dotenv.config();
const { webhook_url: url } = process.env;

import axios from 'axios';

const filter = str => str
  .replace(/\x1B\[[0-9;]*m/g, '')
  .replace(/(https?:\/\/[^\s]+)/g, match => `\"${match}\"`);

export default async function webhook(log, ...message) {
  try {
    const combine = message.join(' ');
    await axios.post(url, {
      content: `\`\`\`js\n${filter(combine)}\n\`\`\``
    });
  } catch (err) {
    if(err.message.includes('getaddrinfo')) return;
    log(3, 'sc.webhook »', err.message);
  }
}