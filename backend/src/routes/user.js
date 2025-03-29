import { Router } from 'express';
import { validationResult as validate, checkSchema as verify, matchedData as match } from 'express-validator';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import User from '../models/user.js';
import UserSchema from '../schemas/valid.user.js';

const { debug } = config;
const router = Router();

router.post('/', 
  verify(UserSchema),
  async (req, res) => {
    if (debug) log(4, 'POST - routes.user');

    const result = validate(req);
    if (!result.isEmpty()) return res.status(400).json(result.array());

    try {
      const data = match(req);
      const user = await User.create(data)
        .catch(err => mongoErrHandler(err, res));
      res.status(201).json(user);
    } catch(err) {
      log(2, 'POST - routes.post »', err.message);
      reply(res, 400, err.message);
    }
  }
)

export default router;
