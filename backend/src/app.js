import express, { json, urlencoded } from 'express';
import { reply } from './utils/common.js';

const app = express();

/* Use handlers */
app.use(json());
app.use(urlencoded({ extended: true }));

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
import post from './routes/post.js';

/* Define routes */
// app.use('/user', user);
app.use('/post', post);

/* Default GET */
app.get('/', (req, res) => {
  reply(res, 200, {
    status: 'OK',
    message: 'Application is running'
  })
})

export default app;