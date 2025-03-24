const { log, reply, addr, args } = require('../scripts/common.js');
const { thumbnail } = require('../scripts/.route.js');

const fs = require('fs');
const path = require('path');

const { debug, media } = require('../conf.json');
let dir;

const ffmpeg = require('fluent-ffmpeg');

const music = {
  path: (req, res, next) => {
    if (debug) log(5, 'md.path');
    try {
      const filter = req.baseUrl.replace(/^\/+/g, '');
      dir = args('--path', path.join(media, filter));
      return next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.path', message: err.message });
    }
  },

  metadata: async (req, res, next) => {
    if (debug) log(5, 'md.metadata');
    try {
      const files = fs.readdirSync(dir, { withFileTypes: true })
        .filter(file => file.isFile())
        .map(file => file.name);

      const result = {
        amount: files.length,
        files: await Promise.all(
          files.map((name, index) => {
            return new Promise((resolve, reject) => {
              const file = path.join(dir, name);
              ffmpeg.ffprobe(file, async (err, data) => {
                const video = file;
                const image = await thumbnail(dir, name, '.thumbnails');

                resolve({
                  index: index + 1,
                  name: path.basename(name, path.extname(name)),
                  length: data.format.duration,
                  video: {
                    size: fs.statSync(video).size,
                    url: `${addr(req)}/${path.basename(dir)}/query?type=video&index=${index + 1}`,
                    file: video,
                  },
                  image: {
                    size: fs.statSync(image).size,
                    url: `${addr(req)}/${path.basename(dir)}/query?type=image&index=${index + 1}`,
                    file: image
                  }
                })

                reject({
                  error: 'Invalid data form'
                })
              })
            })
          })
        )
      }

      req.metadata = result;
      return next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.metadata', message: err.message });
    }
  },

  types: async (req, res, next) => {
    if (debug) log(5, 'md.query.type');
    try {
      const { queued, query: { type } } = req;
      const types = ['video', 'image'];
      if (!types.includes(type)) {
        log(5, `» No valid type (${type})`);
        return reply(res, 404, { error: 'md.query.types', message: 'No valid type' });
      }

      let result;
      switch (type) {
        case 'video':
          result = queued.video.file;
          break;
        case 'image':
          result = queued.image.file;
          break;
      }

      req.file = result;
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.query.types', message: err.message });
    }
  },

  index: async (req, res, next) => {
    if (debug) log(5, 'md.query.index');
    try {
      const { metadata: { files }, query: { index } } = req;
      const parsed = parseInt(index, 10);
      if (isNaN(parsed) || parsed < 1) {
        log(3, `» Invalid index (${index})`);
        return reply(res, 500, { message: 'Invalid index' })
      }

      const result = files[parsed - 1];
      if (!result) {
        log(5, `» File not found (${result})`);
        return reply(res, 404, { message: 'File not found' });
      }

      req.queued = result;
      await music.types(req, res, next);
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.query.index', message: err.message });
    }
  },

  name: async (req, res, next) => {
    if (debug) log(5, 'md.query.name');
    try {
      const { metadata: { files }, query: { name } } = req;
      const value = name.toLowerCase().split(/\s+/g);
      const match = files.filter(file => value.every(word => file.name.toLowerCase().includes(word)))
      if (!match.length) {
        log(3, `» File not found (${name})`);
        return reply(res, 404, { message: 'File not found' })
      }

      const result = match.reduce((prev, curr) => (curr.length < prev.length ? curr : prev));
      if (!result) {
        log(5, `» File not found (${result})`);
        return reply(res, 404, { error: 'md.query.name', message: 'File not found' });
      }

      req.queued = result;
      await music.types(req, res, next);
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.query.name', message: err.message });
    }
  },

  amount: (req, res, next) => {
    if (debug) log(5, 'md.amount');
    try {
      const { metadata: { amount, files }, query: { from, to } } = req;
      const srt = parseInt(from) || 0;
      let end = Math.min(parseInt(to) || amount, srt + 20);
      if (end > amount) end = amount

      const rest = end > amount ? amount : end;
      if (srt < 0 || srt >= rest) {
        log(5, `» Invalid range (${srt} - ${end})`);
        return reply(res, 400, { error: 'md.amount', message: 'Invalid range' });
      }

      const result = {
        total: amount,
        queued: {
          all: rest - srt,
          from: srt,
          to: end,
        },
        files: files.slice(srt, end)
      }

      req.amount = result;
      next();
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.amount', message: err.message });
    }
  },

  query: async (req, res, next) => {
    if (debug) log(5, 'md.query');
    try {
      const { query: { index, name, type } } = req;
      if (!type || (!index && !name)) {
        log(5, `» Invalid query ()`);
        return reply(res, 400, { message: 'Invalid query' });
      }

      if (index) await music.index(req, res, next);
      if (name) await music.name(req, res, next);
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.query', message: err.message });
    }
  }
}

module.exports = { music };