import express from 'express';
const app = express();

import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const { port, addr, mongodb_url: mongo } = process.env;

import colors from 'colors';
const { magenta, grey } = colors;

import { log } from './src/utils/common.js';
import routes from './src/routes.js';

/* Use handlers */
app.use(cors());
app.use(routes);

/* ...REST */

try {
  mongoose.connect(mongo)
  .then(() => log(1, `Connected to MongoDB at ${grey(mongo)}`))
  .catch(err => log(2, `Failed to connect to MongoDB at ${grey(mongo)}:`, grey(err.message)));

  app.listen(port, addr, () => {
    log(1, 'Listening on', grey(`http://${addr}:${port}`));
  });
} catch(err) {
  log(4, 'Failed to start application', err.message);
}