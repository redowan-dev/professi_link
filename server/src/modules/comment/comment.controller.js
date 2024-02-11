import { createCommentService, getAllCommentByPostService } from "./comment.service.js";

export const createCommentController = async(req,res,next)=>{
    try {
        const  result = await createCommentService(req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getAllCommentByPostController = async(req,res,next)=>{

    try {
  
      const {postId} = req.query 
    
        const  result = await getAllCommentByPostService(postId)

        return res.status(200).json({
            status:200,
            success:true,
            data : result,
            total:result.length
        })
    } catch (error) {
        next(error);
    }
}