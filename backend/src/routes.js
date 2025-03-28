import { Router } from 'express';
const router = Router();

import post from './routes/post.js';
import video from './routes/video.js';

router.use('/post', post);
router.use('/video', video);

export default router;