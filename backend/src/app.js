import express, { json, urlencoded } from 'express';
import { reply } from './utils/common.js';

const app = express();

/* Use handlers */
app.use(json());
app.use(urlencoded({ extended: true }));

/* Import routes */
import post from './routes/post.js';
import video from './routes/video.js';

/* Define routes */
app.use('/post', post);
app.use('/video', video);

/* Default GET */
app.get('/', (req, res) => {
  reply(res, 200, {
    status: 'OK',
    message: 'Application is running'
  })
})

export default app;