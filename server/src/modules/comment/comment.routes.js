import  express  from "express"
import { createCommentController, getAllCommentByPostController } from "./comment.controller.js"
export const commentRoutes = express.Router()

commentRoutes.route('/')
.get(getAllCommentByPostController)
.post(createCommentController)

// blogRoutes.route('/:id')
// .get(getBlogDetailsController)