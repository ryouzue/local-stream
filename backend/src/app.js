import express from 'express';
import { appErr } from './handlers/errors.js';
import { reply } from './utils/common.js';

const app = express();

/* Use handlers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appErr);

/* 
# PLANNED
-> automate the process of fetching routes
-> based on the file name

# PROTOTYPE
const routes = path.join(__dirname, 'routes');
fs.readdirSync(routes)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const route = require(`./routes/${file}`);
    app.use(`/${route.path}`, route);
  }
)
*/

/* Import routes */
// import user from './routes/user.js';
// import post from './routes/post.js';
import images from './routes/image.js';

/* Define routes */
// app.use('/user', user);
// app.use('/posts', post);
app.use('/images', images);

/* Default GET */
app.get('/', (req, res) => {
  reply(res, 200, {
    status: 'OK',
    message: 'Application is running'
  })
})

export default app;