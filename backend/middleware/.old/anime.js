const { log, reply, addr, args } = require('../scripts/common.js');
const { metadata, thumbnail } = require('../scripts/.route.js');

const fs = require('fs');
const path = require('path');

const { debug, media } = require('../conf.json');
let dir;

const anime = {
  path: (req, res, next) => {
    if(debug) log(5, 'md.path');
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
    if(debug) log(5, 'md.metadata');
    try {
      fs.readdir(dir,
        { withFileTypes: true },
        async (err, files) => {
          const names = files
            .filter(file => file.isFile())
            .map(file => file.name);

          const result = {
            amount: names.length,
            files: await Promise.all(
              metadata(addr(req), dir, names)
            )
          }

          req.metadata = result;
          return next();
        }
      )
    } catch (err) {
      log(3, '»', err.message);
      return reply(res, 500, { error: 'md.metadata', message: err.message });
    }
  }
}

module.exports = { anime };