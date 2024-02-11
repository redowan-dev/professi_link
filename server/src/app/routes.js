import express from 'express';
import { userRoutes } from '../modules/users/users.routes.js';
import { jobRoutes } from '../modules/Jobs/jobs.routes.js';
import { ApplyRoutes } from '../modules/apply/apply.routes.js';
import { blogRoutes } from '../modules/blog/blog.routes.js';
import { commentRoutes } from '../modules/comment/comment.routes.js';
const routes = express.Router();


// check health routes
routes.get("/health", (_req, res) => {
    res.status(200).json({ 
      status:200,
       message: "success" 
      });

     
  });

  routes.use('/users',userRoutes)
  routes.use('/jobs',jobRoutes)
  routes.use('/apply',ApplyRoutes)
  routes.use('/blog',blogRoutes)
  routes.use('/comment',commentRoutes)

export default routes