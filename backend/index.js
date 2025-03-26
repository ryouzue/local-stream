const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

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

/* Listeners */
const { port, addr } = process.env;
app.listen(port, addr, () => {
  log(1, `Listening on http://${addr}:${port}`);
});