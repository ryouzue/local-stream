import { Router } from 'express';
import { validationResult as validate, checkSchema as verify, matchedData as match } from 'express-validator';

import { log, reply } from '../utils/common.js';
import config from '../../conf.json' assert { type: 'json' };

import User from '../models/user.js';
import UserSchema from '../schemas/valid.user.js';

import { search, separate, compare } from '../middleware/query.js';
import { verify } from '../middleware/validation.js';

const { debug } = config;
const router = Router();

router.post('/', 
  verify(UserSchema),
  search(User),
  separate('_id', 'id', '__v'),
  compare,
  async (req, res) => {
    if (debug) log(4, 'POST - routes.user');

    const result = validate(req);
    if (!result.isEmpty()) return res.status(400).json(result.array());

    try {
      const data = match(req);
      const user = await User.create(data);
      reply(res, 201, user);
    } catch(err) {
      log(2, 'POST - routes.user »', err.message);
      reply(res, 400, { message: 'Internal Server Error' });
    }
  }
)

export default router;
