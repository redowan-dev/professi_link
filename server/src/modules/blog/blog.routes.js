import express from 'express'
import { createBlogController, deleteBlogDetailsController, getAllBlogController, getBlogDetailsController, updateBlogDetailsController } from './blog.controller.js'




export const blogRoutes = express.Router()

blogRoutes.route('/')
.get(getAllBlogController)
.post(createBlogController)

blogRoutes.route('/:id')
.get(getBlogDetailsController)
.patch(updateBlogDetailsController)
.delete(deleteBlogDetailsController)
