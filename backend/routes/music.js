const { Router } = require('express');
const router = Router();

const { log, reply } = require('../scripts/common.js');
const { music } = require('../middleware/music.js');
const { debug } = require('../conf.json');

router.get('/',
  music.path,
  music.metadata,
  music.amount,
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
  music.path,
  music.metadata,
  music.query,
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