const { log, reply, addr, args } = require('../scripts/common.js');
const { thumbnail } = require('../scripts/.route.js');

const fs = require('fs');
const path = require('path');

const { debug, media } = require('../conf.json');
let dir;

const ffmpeg = require('fluent-ffmpeg');

const anime = {
  path: (req, res, next) => {
    if (debug) log(5, 'md.path');
    try {
      /* new logic */
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.path', message: err.message });
    }
  },

  metadata: async (req, res, next) => {
    if (debug) log(5, 'md.metadata');
    try {
      /* new logic */
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { 
        error: 'md.metadata', 
        message: err.message 
      });
    }
  },

  types: async (req, res, next) => {
    if (debug) log(5, 'md.query.type');
    try {
      /* new logic */
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { 
        error: 'md.query.types', 
        message: err.message 
      });
    }
  },

  index: async (req, res, next) => {
    if (debug) log(5, 'md.query.index');
    try {
      /* new logic */
      await music.types(req, res, next);
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { 
        error: 'md.query.index', 
        message: err.message 
      });
    }
  },

  name: async (req, res, next) => {
    if (debug) log(5, 'md.query.name');
    try {
      /* new logic */
      await music.types(req, res, next);
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { 
        error: 'md.query.name', 
        message: err.message 
      });
    }
  },

  query: async (req, res, next) => {
    if (debug) log(5, 'md.query');
    try {
      /* new logic */
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { 
        error: 'md.query', 
        message: err.message 
      });
    }
  }
}

module.exports = { music };