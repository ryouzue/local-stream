import { Router } from 'express';
const router = Router();

import post from './post.js';
import video from './video.js';

router.use('/post', post);
router.use('/video', video);

export default router;