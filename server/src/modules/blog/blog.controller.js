import { createBlogService, deleteBlogDetailsService, getAllBlogService, getBlogDetailsService, updateBlogDetailsService } from "./blog.services.js";

export const createBlogController = async(req,res,next)=>{
    try {
        const  result = await createBlogService(req.body)
        return res.status(201).json({
            status:201,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getAllBlogController = async(req,res,next)=>{

    try {
        const queries={}
  const {userId}= req.query
 if(userId){
    queries.user=userId;
 }
      
        const  result = await getAllBlogService(queries)

        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const getBlogDetailsController = async(req,res,next)=>{
    try {
        const {id} = req.params
        const  result = await getBlogDetailsService(id)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const updateBlogDetailsController = async(req,res,next)=>{
    try {
        const {id} = req.params
        const  result = await updateBlogDetailsService(id,req.body)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}
export const deleteBlogDetailsController = async(req,res,next)=>{
    try {
        const {id} = req.params
        const  result = await deleteBlogDetailsService(id)
        return res.status(200).json({
            status:200,
            success:true,
            data : result
        })
    } catch (error) {
        next(error);
    }
}


