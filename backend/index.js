const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const { port, addr, mongo } = process.env;

const { magenta, grey } = require('colors');
const { log } = require('./scripts/common.js');
const routes = require('./routes/default.js');

/* Use handlers */
app.use(cors());
app.use(routes);

/* Get handlers */
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('*', (req, res) => {
  res.status(404).send({});
});

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