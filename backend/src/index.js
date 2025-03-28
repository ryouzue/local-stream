import app from './app.js';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const { port, addr, mongodb_url: mongo } = process.env;
import { log, color } from './utils/common.js';

/* Last step */

try {
  mongoose.connect(mongo)
  .then(() => log(1, `Connected to MongoDB at ${color.grey(mongo)}`))
  .catch(err => log(2, `Failed to connect to MongoDB at ${color.grey(mongo)}:`, color.red(err.message)));

  app.listen(port, addr, () => {
    log(1, 'Listening on', color.grey(`http://${addr}:${port}`));
  });
} catch(err) {
  log(4, 'Failed to start application', err.message);
}