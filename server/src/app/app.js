import 'dotenv/config.js'
import express from 'express';
import middleware from './middlewares.js';
import routes from './routes.js';
import { errorHandler, notFoundHandler } from './errors.js';


const app = express();
app.use(middleware)
app.use('/api',routes)
app.use(notFoundHandler)
app.use(errorHandler)

export default app