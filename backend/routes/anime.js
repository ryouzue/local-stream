const { Router } = require('express');
const router = Router();

const { log, reply } = require('../scripts/common.js');
const { anime } = require('../middleware/anime.js');
const { debug } = require('../conf.json');

router.get('/',
  anime.path,
  anime.metadata,
  (req, res) => {
    if(debug) log(4, req.baseUrl);
    try {
      const { amount } = req;
      return res.json(amount);
    } catch(err) {
      log(3, `${req.baseUrl}/ » ${err.message}`);
      return reply(res, null, { 
        error: req.baseUrl, 
        message: err.message 
      });
    }
  }
);

router.get('/query',
  anime.path,
  anime.metadata,
  (req, res) => {
    if(debug) log(4, req.baseUrl);
    try {
      const { file } = req;
      return res.sendFile(file);
    } catch(err) {
      log(3, '»', err.message);
      return reply(res, null, { 
        error: `${req.baseUrl}/query`, 
        message: err.message 
      });
    }
  }
);

module.exports = router;